//
//  NetworkError.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import Foundation

enum NetworkError: Error {
    case badResponse
    case badStatusCode(Int)
    case badURL
    case badEncode
    
    var message: String {
        switch self {
        case .badResponse:
            return "Response가 올바르지 않습니다."
        case .badStatusCode(let code):
            return "응답코드가 올바르지 않습니다. 응답코드: \(code)"
        case .badURL:
            return "URL이 올바르지 않습니다."
        case .badEncode:
            return "데이터를 Encoding하는데 실패했습니다."
        }
    }
}
