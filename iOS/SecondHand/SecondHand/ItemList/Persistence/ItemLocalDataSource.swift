//
//  ItemLocalDataSource.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

protocol ListLocalDataSource {
    func fetchImageKeys(itemIndex: Int, imageUrl: String) -> NSString
}

struct ItemListLocalDataSource: ListLocalDataSource {
    func fetchImageKeys(itemIndex: Int, imageUrl: String) -> NSString {
        
    }
}
