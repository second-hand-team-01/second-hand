//
//  IssueListItem.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import Foundation

enum Section {
    case item
}

struct Item: Codable, Hashable {
    let itemIdx: Int
    let imageURL: String
    let itemTitle: String
    let price: Int
    let isState: String
    let likeCount: Int
    let chatCount: Int
}
