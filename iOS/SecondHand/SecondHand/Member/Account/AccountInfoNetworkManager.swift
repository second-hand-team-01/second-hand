//
//  AccountInfoNetworkManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import Foundation

struct AccountInfoNetworkManager {
    private var decoder = JSONDecoder()
    private var session = URLSession.shared
    
    func request() async -> MemberInfoDTO? {
        guard let url = URL(string: ServerURL.base + "info") else {
            return nil
        }
        var request = URLRequest(url: url)
        request.httpMethod = "GET"

        do {
            let (data, urlResponse) = try await session.data(for: request)

            guard let response = urlResponse as? HTTPURLResponse else {
                LogManager.generate(level: .info, NetworkError.badResponse.message)
                throw NetworkError.badResponse
            }
            
            guard (200..<300).contains(response.statusCode) else {
                let statusCode = response.statusCode
                LogManager.generate(level: .info, NetworkError.badStatusCode(statusCode).message)
                throw NetworkError.badStatusCode(response.statusCode)
            }
            
            return try decoder.decode(MemberInfoDTO.self, from: data)
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .info, "\(decodingError)")
            }
            return nil
        }
    }
    
//    func request(image url: String) async throws -> String? {
//        guard let imageURL = URL(string: url) else {
//            return nil
//        }
//        do {
//            let (url, urlResponse) = try await session.download(from: imageURL)
//
//            guard let response = urlResponse as? HTTPURLResponse else {
//                LogManger.generate(level: .info, NetworkError.badResponse.message)
//                throw NetworkError.badResponse
//            }
//
//            guard (200..<300).contains(response.statusCode) else {
//                let statusCode = response.statusCode
//                LogManger.generate(level: .info, NetworkError.badStatusCode(statusCode).message)
//                throw NetworkError.badStatusCode(response.statusCode)
//            }
//
//            return try decoder.decode(MemberInfoDTO.self, from: data)
//        } catch let error {
//            if let decodingError = error as? DecodingError {
//                LogManger.generate(level: .info, "\(decodingError)")
//            }
//            return nil
//        }
//    }
}
