//
//  DetailNetworkManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/30.
//

import Foundation

struct DetailRemoteDataSource {
    private var session = URLSession.shared
    private var decoder = JSONDecoder()
    
    func request(item index: Int) async -> ItemDetailDTO? {
        guard let url = URL(string: ServerURL.base + "items/\(index)") else {
            return nil
        }
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.allHTTPHeaderFields = [
            "token": "Bearer \(SecretKeys.accessToken)"
        ]
        
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
            
            return try decoder.decode(ItemDetailDTO.self, from: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManger.generate(level: .network, "\(decodingError)")
            }
            return nil
        }
    }
}
