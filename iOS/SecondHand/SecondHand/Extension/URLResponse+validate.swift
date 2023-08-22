//
//  URLResponseValidator.swift
//  SecondHand
//
//  Created by Wood on 2023/08/19.
//

import Foundation

extension URLResponse {
    static func validate(_ response: URLResponse) -> Bool {
        guard let response = response as? HTTPURLResponse else {
            LogManager.generate(level: .network, NetworkError.badResponse.message)
            return false
        }

        guard (200..<300).contains(response.statusCode) else {
            LogManager.generate(level: .network, NetworkError.badStatusCode(response.statusCode).message)
            return false
        }

        return true
    }
}
