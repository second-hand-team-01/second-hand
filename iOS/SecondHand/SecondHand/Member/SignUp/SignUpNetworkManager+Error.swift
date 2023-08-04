//
//  SignUpNetwork.swift
//  SecondHand
//
//  Created by apple on 2023/06/28.
//

import Foundation

struct SignUpNetworkManager: DecodeManager {
    typealias DTO = SignUpResponseDTO
    var decoder = JSONDecoder()
    private var session = URLSession.shared
    
    func decode(using data: Data) throws -> DTO {
        do {
            return try decoder.decode(DTO.self, from: data)
        } catch {
            throw error
        }
    }
    
    func request(signUpInfo: SignUpDTO) async -> DTO? {
        guard let signUpUrl = URL(string: ServerURL.base + "signup") else {
            LogManager.generate(level: .network, "badURL")
            return nil
        }
        
        var request = URLRequest(url: signUpUrl)
        let boundary = "Boundary-\(UUID().uuidString)"
        
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary=\(boundary)",
                forHTTPHeaderField: "Content-Type")
                
        let signUpData = [
            "loginId": signUpInfo.loginId,
            "password": signUpInfo.password,
            "mainLocationIdx": signUpInfo.mainLocationIdx,
            "subLocationIdx": signUpInfo.subLocationIdx
        ]

        request.httpBody = createBody(paramaeters: signUpData, image: signUpInfo.image, boundary: boundary)

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard let response = urlResponse as? HTTPURLResponse else {
                LogManager.generate(level: .network, SignUpError.badResponse.message)
                throw SignUpError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                let statusCode = response.statusCode
                if statusCode == 400 {
                    LogManager.generate(level: .network, SignUpError.badDuplicatedId.message)
                    throw SignUpError.badDuplicatedId
                }
                LogManager.generate(level: .network, SignUpError.badStatusCode(statusCode).message)
                throw SignUpError.badStatusCode(response.statusCode)
            }

            return try decode(using: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }
            return nil
        }
    }
    
    func createBody(paramaeters: [String: Any], image: Data?, boundary: String) -> Data {
        var body = Data()
        
        for (key, value) in paramaeters {
            body.append("--\(boundary)\r\n".data(using: .utf8) ?? Data())
            body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: .utf8) ?? Data())
            body.append("\(value)".data(using: .utf8) ?? Data())
            body.append("\r\n".data(using: .utf8) ?? Data())
        }
        
        if let image = image {
            body.append("--\(boundary)\r\n".data(using: .utf8) ?? Data())
            body.append("Content-Disposition: form-data; name=\"image\"; filename=\"image.png\"\r\n".data(using: .utf8) ?? Data())
            body.append("Content-Type: image/png\r\n\r\n".data(using: .utf8) ?? Data())
            body.append(image)
            body.append("\r\n".data(using: .utf8) ?? Data())
        }
                
        body.append("--\(boundary)--\r\n".data(using: .utf8) ?? Data())
        return body
    }
}

enum SignUpError: Error {
    case badResponse
    case badDuplicatedId
    case badStatusCode(Int)
    
    var message: String {
        switch self {
        case .badResponse:
            return "Response가 올바르지 않습니다."
        case .badDuplicatedId:
            return "중복된 Id입니다."
        case .badStatusCode(let code):
            return "응답코드가 올바르지 않습니다. 응답코드: \(code)"
        }
    }
}
