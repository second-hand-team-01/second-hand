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
        let updatedTime: String
        let description: String
    }
    
    struct Count {
        let chat: Int
        let favorite: Int
        let view: Int
    }

    let imageKeys: [String]
    let sellerName: String
    var status: String
    var isUserInterested: Bool
    
    init(
        imageKeys: [String],
        sellerName: String,
        status: String,
        isUserInterested: Bool
    ) {
        self.imageKeys = imageKeys
        self.sellerName = sellerName
        self.status = status
        self.isUserInterested = isUserInterested
    }
}
