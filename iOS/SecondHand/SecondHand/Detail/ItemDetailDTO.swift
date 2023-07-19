//
//  ItemDetailDTO.swift
//  SecondHand
//
//  Created by Wood on 2023/06/30.
//

import Foundation

struct ItemDetailDTO: DTO {
    struct Seller: Codable {
        let sellerIdx: Int
        let sellerId: String
        let sellerProfileImage: String?
    }
    
    struct Category: Codable {
        let idx: Int
        let name: String
    }
    
    struct Detail: Codable {
        let itemIdx: Int
        let name: String
        let seller: Seller
        let category: Category
        let description: String
        let price: Int
        let chat: Int
        let interest: Int
        let view: Int
        let interestChecked: Bool
        let lastModifiedAt: String
        let imageUrl: [String]
    }
    
    var success: Bool
    var status: Int
    var code: Int
    var message: String
    let data: Detail
}
