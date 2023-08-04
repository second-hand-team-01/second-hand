//
//  UserInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/23.
//

import Foundation

struct SignInResponseDTO: Codable {
    let success: Bool
    let status: Int
    let code: Int
    let message: String
    let data: ResponseData

    struct ResponseData: Codable {
        let token: String
        let memberInfo: MemberInfo
    }
    
    struct MemberInfo: Codable {
        let memberIdx: Int
        let loginId: String
        let imgUrl: String?
    }
}
