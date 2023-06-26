//
//  LoginNetworkManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/23.
//
import Foundation

struct LoginNetworkManager: DecodeManager {
    typealias DTO = LoginResponseDTO
    var decoder = JSONDecoder()
    private var session = URLSession.shared
    
    func decode(using data: Data) throws -> LoginResponseDTO {
        do {
            return try decoder.decode(DTO.self, from: data)
        } catch {
            throw error
        }
    }
    
    func request(loginInfo: LoginDTO) async -> DTO? {
        guard let loginUrl = URL(string: ServerURL.base + "login") else {
            LogManger.generate(level: .network, "badURL")
            return nil
        }
        
        var request = URLRequest(url: loginUrl)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let loginData = [
            "loginId": loginInfo.loginId,
            "password": loginInfo.password
        ]
        let body = try? JSONSerialization.data(withJSONObject: loginData, options: [])
        request.httpBody = body

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard let response = urlResponse as? HTTPURLResponse else {
                LogManger.generate(level: .network, LoginError.badResponse.message)
                throw LoginError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                let statusCode = response.statusCode
                LogManger.generate(level: .network, LoginError.badStatusCode(statusCode).message)
                throw LoginError.badStatusCode(response.statusCode)
            }
            
            return try decode(using: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManger.generate(level: .network, "\(decodingError)")
            }
            return nil
        }
    }
}

enum LoginError: Error {
    case badResponse
    case badStatusCode(Int)
    
    var message: String {
        switch self {
        case .badResponse:
            return "Response가 올바르지 않습니다."
        case .badStatusCode(let code):
            return "응답코드가 올바르지 않습니다. 응답코드: \(code)"
        }
    }
}
