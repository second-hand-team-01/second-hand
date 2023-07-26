//
//  FavoriteResponseDTO.swift
//  Pods
//
//  Created by Wood on 2023/07/26.
//

import Foundation

struct FavoriteResponseDTO: DTO {
    var success: Bool
    var status: Int
    var code: Int
    var message: String
}
