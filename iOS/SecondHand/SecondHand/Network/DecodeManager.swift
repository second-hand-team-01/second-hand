//
//  DecodeManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/24.
//

import Foundation

protocol DecodeManager {
    associatedtype DTO
    associatedtype Model
    
    func decode(
        data: Data,
        dto: DTO
    ) -> Model
}
