//
//  UserInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/23.
//

import Foundation

struct LoginResponseDTO: Codable {
    let success: Bool
    let status: Int
    let code: Int
    let message: String
    let data: ResponseData

    struct ResponseData: Codable {
        let accessToken: String
        let memeberInfo: MemberInfo

        struct MemberInfo: Codable {
            let memeberIdx: Int
            let loginId: String
        }
    }
}
