//
//  ItemListDTO.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

struct ItemListDTO: DTO {
    struct Item: Codable {
        var itemIdx: Int
        var imageUrl: String
        var name: String
        var location: String
        var postedAt: String
        var status: String
        var price: Int
        var chat: Int
        var interest: Int
        var interestChecked: Bool
    }
    
    struct ItemListData: Codable {
        var hasNext: Bool
        var items: [Item]
    }
    
    var success: Bool
    var status: Int
    var code: Int
    var message: String
    var data: ItemListData
}
