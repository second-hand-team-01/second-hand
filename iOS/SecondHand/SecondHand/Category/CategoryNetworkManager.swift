//
//  CategoryNetworkManager.swift
//  
//
//  Created by Wood on 2023/08/14.
//

import Foundation

final class CategoryNetworkManager {
    let shared = URLSession.shared

    private func validate(urlResponse: URLResponse) -> Bool {
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
    
    func loadData() async -> [String]? {
        guard let url = URL(string: "\(ServerURL.base)category") else {
            return nil
        }
        
        do {
            let (data, urlResponse) = try await self.shared.data(from: url)
            
            guard self.validate(urlResponse: urlResponse) else {
                return nil
            }
            
            let decodedData = try JSONDecoder().decode(CategoryDTO.self, from: data)
            var names: [String] = []
            decodedData.data.forEach { (categoryData: CategoryDTO.CategoryData) in
                names.append(categoryData.name)
            }
            
            return names
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }
            
            LogManager.generate(level: .network, "\(NetworkError.badEncode)")
            return nil
        }
    }
}
