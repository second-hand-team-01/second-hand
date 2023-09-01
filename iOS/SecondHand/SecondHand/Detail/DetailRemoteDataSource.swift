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
    private let itemIndex: Int
    private let baseURLString: String

    init(itemIndex: Int = 0) {
        self.itemIndex = itemIndex
        self.baseURLString = "\(ServerURL.base)items/\(itemIndex)"
    }

    // MARK: Data Load Request
    
    func requestData() async -> ItemDetailDTO? {
        guard let url = URL(string: baseURLString) else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return nil
        }

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.allHTTPHeaderFields = ["Authorization": "Bearer \(SecretKeys.accessToken)"]

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard URLResponse.validate(urlResponse) else {
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

            guard URLResponse.validate(urlResponse) else {
                return nil
            }

            return dataURL

        } catch let error {
            LogManager.generate(level: .network, "\(error)")
            return nil
        }
    }
    
    // MARK: Favorite Request

    struct FavoriteRequestBody: Encodable {
        let itemIdx: Int
        let interestChecked: Bool
    }

    func requestFavorites(isAdding: Bool) async -> Bool? {
        guard let favoriteRequestURL = URL(string: ServerURL.base + "items/") else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return nil
        }

        var request = URLRequest(url: favoriteRequestURL)
        request.httpMethod = "PUT"
        request.allHTTPHeaderFields = [
            "Authorization": "Bearer \(SecretKeys.accessToken)",
            "Content-Type": "application/json"
        ]

        let bodyStruct = FavoriteRequestBody(itemIdx: self.itemIndex, interestChecked: isAdding)
        guard let httpBody = try? JSONEncoder().encode(bodyStruct) else {
            LogManager.generate(level: .network, NetworkError.badEncode.message)
            return nil
        }
        request.httpBody = httpBody

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard URLResponse.validate(urlResponse) else {
                return nil
            }

            let decodedData = try decoder.decode(FavoriteResponseDTO.self, from: data)

            guard decodedData.success else {
                return nil
            }

            return isAdding
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }

            LogManager.generate(level: .network, "\(error)")
            return nil
        }
    }
    
    struct DeleteRequestBody: Encodable {
        let itemIdx: Int
    }
    
    private func makeDeleteURLRequest() -> URLRequest? {
        guard let url = URL(string: self.baseURLString) else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return nil
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.allHTTPHeaderFields = [
            "Authorization": "Bearer \(SecretKeys.accessToken)",
            "Content-Type": "application/json"
        ]
        
        let body = DeleteRequestBody(itemIdx: self.itemIndex)
        guard let httpBody = try? JSONEncoder().encode(body) else {
            LogManager.generate(level: .network, NetworkError.badEncode.message)
            return nil
        }
        request.httpBody = httpBody
        
        return request
    }
    
    // MARK: Delete Request
    func requestDelete() async -> Int? {
        guard let detleteRequest = self.makeDeleteURLRequest() else {
            return nil
        }
        
        do {
            let (_, response) = try await session.data(for: detleteRequest)
            
            guard URLResponse.validate(response) else {
                return nil
            }
            
            return self.itemIndex
            
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }

            LogManager.generate(level: .network, "\(error)")
            return nil
        }
    }
}
