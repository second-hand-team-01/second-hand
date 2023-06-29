//
//  SignUpResponseDTO.swift
//  SecondHand
//
//  Created by apple on 2023/06/28.
//

import Foundation

struct SignUpResponseDTO: DTO {
    let success: Bool
    let status: Int
    let code: Int
    let message: String
}
