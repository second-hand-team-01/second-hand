//
//  DetailModelMapper.swift
//  SecondHand
//
//  Created by Wood on 2023/07/17.
//

import Foundation

struct DetailModelMapper {
    func convert(
        by data: ItemDetailDTO.Detail,
        with keys: [NSString?]
    ) -> DetailModel? {
        let productInfo = DetailModel.ProductInfo(
            title: data.name,
            category: data.category.name,
            postedTime: data.postedAt,
            description: data.description
        )

        let userInteractionCount = DetailModel.UserInteractionCount(
            chat: data.chat,
            favorite: data.interest,
            view: data.view
        )
        
        let status = "판매중"
        
        return DetailModel(
            imageKeys: keys,
            sellerName: data.seller.sellerId,
            productInfo: productInfo,
            userInteractionCount: userInteractionCount,
            price: data.price,
            status: status,
            isUserInterested: data.interestChecked
        )
    }
}
