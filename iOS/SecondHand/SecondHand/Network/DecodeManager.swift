//
//  DecodeManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import Foundation

// TODO: - 프로토콜 vs 구조체
protocol DecodeManager {
    associatedtype DTO
    var decoder: JSONDecoder { get }
    
    func decode(using data: Data) throws -> DTO
}
