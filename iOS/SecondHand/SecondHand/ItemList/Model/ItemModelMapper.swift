//
//  ItemModelMapper.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

struct ItemModelMapper {
    static func convert(from data: ItemListDTO.Item) -> ItemModel {
        let itemIndex = data.itemIdx
        let imageKey = "ItemList/\(data.itemIdx)"
        let name = data.name
        let location = data.location
        let postedAt = data.postedAt
        let status = data.status
        let price = data.price
        let chatCount = data.chat
        let interestCount = data.interest
        let interestChecked = data.interestChecked
        
        let itemModel = ItemModel(
            itemIndex: itemIndex,
            imageKey: imageKey,
            name: name,
            location: location,
            postedAt: postedAt,
            status: status,
            price: price,
            chatCount: chatCount,
            interestCount: interestCount,
            interestChecked: interestChecked
        )
        
        return itemModel
    }
}
