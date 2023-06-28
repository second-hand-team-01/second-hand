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
            LogManger.generate(level: .network, "badURL")
            return nil
        }
        
        var request = URLRequest(url: signUpUrl)
        let boundary = "Boundary-\(UUID().uuidString)"
        
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary\(boundary)",
                forHTTPHeaderField: "Content-Type")
        
        let signUpData = [
            "loginId": signUpInfo.loginId,
            "password": signUpInfo.password,
            "mainLocationIdx": signUpInfo.mainLocationIdx,
            "subLocationIdx": signUpInfo.subLocationIdx
        ]

        request.httpBody = createBody(paramaeters: signUpData, boundary: boundary)

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard let response = urlResponse as? HTTPURLResponse else {
                LogManger.generate(level: .network, SignUpError.badResponse.message)
                throw SignUpError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                let statusCode = response.statusCode
                if statusCode == 400 {
                    LogManger.generate(level: .network, SignUpError.badDuplicatedId.message)
                    throw SignUpError.badDuplicatedId
                }
                LogManger.generate(level: .network, SignUpError.badStatusCode(statusCode).message)
                throw SignUpError.badStatusCode(response.statusCode)
            }

            return try decode(using: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManger.generate(level: .network, "\(decodingError)")
            }
            return nil
        }
    }
    
    func createBody(paramaeters: [String: Any], boundary: String) -> Data {
        var body = Data()
        let boundaryPrefix = "--\(boundary)\r\n"
        
        for (key, value) in paramaeters {
            body.append(boundaryPrefix.data(using: .utf8) ?? Data())
            body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: .utf8) ?? Data())
            body.append("\(value)\r\n".data(using: .utf8) ?? Data())
        }
        
        body.append(boundaryPrefix.data(using: .utf8) ?? Data())
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
