//
//  LoginNetworkManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/23.
//
import Foundation

struct LoginNetworkManager: DecodeManager {
    typealias DTO = LoginResponseDTO
    typealias Model = <#type#>
    
    
    let session = URLSession.shared
    
    func makeRequest(loginInfo: LoginDTO) async {
        guard let loginUrl = URL(string: ServerURL.base + "login") else {
            return
        }
        
        var request = URLRequest(url: loginUrl)
        request.httpMethod = "POST"
        request.allHTTPHeaderFields = [
            "loginId": loginInfo.loginId,
            "password": loginInfo.password
        ]

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard let response = urlResponse as? HTTPURLResponse else {
                throw LoginError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                throw LoginError.badStatusCode
            }
            
            
            
        } catch LoginError.badResponse {
            
        } catch LoginError.badStatusCode {
            
        } catch {
            
        }
    }
}

enum LoginError: Error {
    case badResponse
    case badStatusCode
}


