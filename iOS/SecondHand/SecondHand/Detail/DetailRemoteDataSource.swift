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
    
    func validate(urlResponse: URLResponse) -> Bool {
        guard let response = urlResponse as? HTTPURLResponse else {
            LogManager.generate(level: .network, NetworkError.badResponse.message)
            return false
        }
        
        guard (200..<300).contains(response.statusCode) else {
            LogManager.generate(level: .network, NetworkError.badStatusCode(response.statusCode).message)
            return false
        }
        
        return true
    }
    
    func request(item index: Int) async -> ItemDetailDTO? {
        guard let url = URL(string: ServerURL.base + "items/\(index)") else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return nil
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.allHTTPHeaderFields = [
            "token": "Bearer \(SecretKeys.accessToken)"
        ]
        
        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard validate(urlResponse: urlResponse) else {
                return nil
            }
            
            return try decoder.decode(ItemDetailDTO.self, from: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }
            
            LogManager.generate(level: .network, "\(error)")
            return nil
        }
    }
    
    func downloadImage(from urlString: String) async -> URL? {
        guard let downloadURL = URL(string: urlString) else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return nil
        }
        
        do {
            let (dataURL, urlResponse) = try await session.download(from: downloadURL)

            guard validate(urlResponse: urlResponse) else {
                return nil
            }

            return dataURL
        } catch let error {
            LogManager.generate(level: .network, "\(error)")
            return nil
        }
    }
}
