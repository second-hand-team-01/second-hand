//
//  DetailModel.swift
//  SecondHand
//
//  Created by Wood on 2023/07/14.
//

import Foundation

class DetailModel {
    struct ProductInfo {
        let title: String
        let category: String
        let postedTime: String
        let description: String
    }
    
    struct UserInteractionCount {
        let chat: Int
        let favorite: Int
        let view: Int
    }
    
    let imageKeys: [NSString?]
    let sellerName: String
    let productInfo: ProductInfo
    let userInteractionCount: UserInteractionCount
    let price: Int
    var status: String
    var isUserInterested: Bool
    
    init(
        imageKeys: [NSString?],
        sellerName: String,
        productInfo: ProductInfo,
        userInteractionCount: UserInteractionCount,
        price: Int,
        status: String,
        isUserInterested: Bool
    ) {
        self.imageKeys = imageKeys
        self.sellerName = sellerName
        self.productInfo = productInfo
        self.userInteractionCount = userInteractionCount
        self.price = price
        self.status = status
        self.isUserInterested = isUserInterested
    }
}
