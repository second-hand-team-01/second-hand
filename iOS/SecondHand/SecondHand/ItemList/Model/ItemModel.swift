//
//  ItemModel.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

struct ItemModel {
    let itemIdx: Int
    var imageKey: NSString
    var name: String
    var location: String
    var postedAt: String
    var status: String
    var price: Int
    var chatCount: Int
    var interestCount: Int
    var interestChecked: Bool
}
