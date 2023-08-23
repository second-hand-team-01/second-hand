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
    let location: String
    let writeDate: Date
    let price: Int
    let isState: String
    let likeCount: Int
    let chatCount: Int
}

extension Item {
    static let sampleData = [
        Item(itemIdx: 1, imageURL: "", itemTitle: "아이템1", location: "역삼1동", writeDate: Date(timeIntervalSinceNow: -3600), price: 100000, isState: "판메증", likeCount: 1, chatCount: 123),
        Item(itemIdx: 2, imageURL: "", itemTitle: "아이템2", location: "역삼2동", writeDate: Date(timeIntervalSinceNow: -10), price: 1234000, isState: "예약중", likeCount: 10, chatCount: 0),
        Item(itemIdx: 3, imageURL: "", itemTitle: "아이템3", location: "역삼1동", writeDate: Date(timeIntervalSinceNow: -360), price: 10234500, isState: "판매완료", likeCount: 100, chatCount: 2),
        Item(itemIdx: 4, imageURL: "", itemTitle: "아이템4", location: "역삼3동", writeDate: Date(timeIntervalSinceNow: -366600), price: 112, isState: "판메증", likeCount: 9, chatCount: 123),
        Item(itemIdx: 5, imageURL: "", itemTitle: "아이템5", location: "역삼2동", writeDate: Date(timeIntervalSinceNow: -100), price: 15412000, isState: "예약중", likeCount: 56, chatCount: 2345)
    ]
    
    static func addSampleData(from index: Int) -> [Item] { 
        return [
            Item(itemIdx: index + 1, imageURL: "", itemTitle: "아이템1", location: "역삼1동", writeDate: Date(timeIntervalSinceNow: -3600), price: 100000, isState: "판메증", likeCount: 1, chatCount: 123),
            Item(itemIdx: index + 2, imageURL: "", itemTitle: "아이템2", location: "역삼2동", writeDate: Date(timeIntervalSinceNow: -10), price: 1234000, isState: "예약중", likeCount: 10, chatCount: 0),
            Item(itemIdx: index + 3, imageURL: "", itemTitle: "아이템3", location: "역삼1동", writeDate: Date(timeIntervalSinceNow: -360), price: 10234500, isState: "판매완료", likeCount: 100, chatCount: 2),
            Item(itemIdx: index + 4, imageURL: "", itemTitle: "아이템4", location: "역삼3동", writeDate: Date(timeIntervalSinceNow: -366600), price: 112, isState: "판메증", likeCount: 9, chatCount: 123),
            Item(itemIdx: index + 5, imageURL: "", itemTitle: "아이템5", location: "역삼2동", writeDate: Date(timeIntervalSinceNow: -100), price: 15412000, isState: "예약중", likeCount: 56, chatCount: 2345)
        ]
    }
}
