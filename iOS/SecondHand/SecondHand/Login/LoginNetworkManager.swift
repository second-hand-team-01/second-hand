//
//  LoginNetworkManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/23.
//
import Foundation

struct LoginNetworkManager {
    enum RequestType: String {
        case githubSignIn = "https://guardiansofthecodesquad.site/login/oauth/github-ios?code="
        case signIn = "login"
        case signOut = "signup"
    }

    private var decoder = JSONDecoder()
    private var session = URLSession.shared
    
    func makeRequest(_ type: RequestType) -> URLRequest? {
        let urlString: String
        switch type {
        case .githubSignIn:
            urlString = type.rawValue + OAuth.code
        case .signIn:
            urlString = ServerURL.base + type.rawValue
        case .signOut:
            urlString = ServerURL.base + type.rawValue
        }
        
        guard let url = URL(string: urlString) else {
            return nil
        }
        
        guard type != .githubSignIn else {
            return URLRequest(url: url)
        }
        
        return URLRequest(url: url)
    }
    
    func request<T: Encodable>(type: RequestType, data: T) async -> LoginResponseDTO? {
        guard var request = makeRequest(type) else {
            return nil
        }
        
        switch type {
        case .githubSignIn:
            request.httpMethod = "GET"
        default:
            request.httpMethod = "POST"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            
            guard let loginData = data as? LoginDTO else {
                return nil
            }
            
            let body = try? JSONEncoder().encode(loginData)
            request.httpBody = body
        }
        
        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard let response = urlResponse as? HTTPURLResponse else {
                LogManger.generate(level: .network, NetworkError.badResponse.message)
                throw NetworkError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                let statusCode = response.statusCode
                LogManger.generate(level: .network, NetworkError.badStatusCode(statusCode).message)
                throw NetworkError.badStatusCode(response.statusCode)
            }
            
            return try decoder.decode(LoginResponseDTO.self, from: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManger.generate(level: .network, "\(decodingError)")
            }
            return nil
        }
    }
}
