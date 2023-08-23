//
//  ItemModelMapper.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

struct ItemModelMapper {
    static func convert(
        by data: ItemListDTO.Item,
        with key: NSString
    ) -> ItemModel? {
        let itemIndex = data.itemIdx
        let imageKey = key
        let name = data.name
        let location = data.location
        let postedAt = data.postedAt
        let status = data.status
        let price = data.price
        let chatCount = data.chat
        let interestCount = data.interest
        let interestChecked = data.interestChecked
        
        let itemModel = ItemModel(
            itemIdx: itemIndex,
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
