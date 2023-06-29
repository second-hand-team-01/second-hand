//
//  MemberInfoDTO.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import Foundation

struct MemberInfoDTO: DTO {
    let success: Bool
    let status: Int
    let code: Int
    let message: String
    let data: MemberInfo?
    
    struct MemberInfo: Codable {
        let memberIdx: Int
        let memeberLoginId: String
        let imageUrl: String?
    }
}
