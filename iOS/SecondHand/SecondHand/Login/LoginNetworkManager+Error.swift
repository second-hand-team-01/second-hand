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
        
        if let url = request.url,
           url.absoluteString != RequestType.githubSignIn.rawValue {
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
                LogManger.generate(level: .network, LoginError.badResponse.message)
                throw LoginError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                let statusCode = response.statusCode
                LogManger.generate(level: .network, LoginError.badStatusCode(statusCode).message)
                throw LoginError.badStatusCode(response.statusCode)
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
