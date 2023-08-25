//
//  ItemViewModel.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

// ImageKey의 타입인 NSString이 Sendable을 채택하지 않아 만든 커스텀 타입
final class ImageKey: NSObject, Sendable {
    let value: String

    init(value: String) {
        self.value = value
    }

    override var hash: Int {
        return self.value.hashValue
    }
    
    override func isEqual(_ object: Any?) -> Bool {
        guard let imageKey = object as? ImageKey else {
            return false
        }

        return imageKey.value == self.value
    }
}

struct ItemViewModel: Hashable, Sendable {
    let itemIndex: Int
    let imageKey: ImageKey
    let title: String
    let location: String
    let passedTime: String
    let price: Int
    let status: String
    let interestCount: String
    let chatCount: String
    
    static func == (lhs: ItemViewModel, rhs: ItemViewModel) -> Bool {
        return lhs.itemIndex == rhs.itemIndex
    }
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(itemIndex)
    }
}
