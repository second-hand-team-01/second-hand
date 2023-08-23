//
//  ItemLocalDataSource.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

protocol ListLocalDataSource {
    func checkFileExists(itemIndex: Int) -> Bool
    func fetchImageKeys(itemIndex: Int, imageUrl: String) -> NSString
}

struct ItemListLocalDataSource: ListLocalDataSource {
    private var fileManager = FileManager.default
    private let cacheDirectoryPath: String = {
        let cacheDirectoryURL = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )[0]
        return cacheDirectoryURL.path()
    }()
    
    func checkFileExists(itemIndex: Int) -> Bool {
        let path = "\(self.cacheDirectoryPath)/ItemList/\(itemIndex).jpeg"

        if self.fileManager.fileExists(atPath: path) {
            return true
        }
        return false
    }
    
    func fetchImageKeys(itemIndex: Int, imageUrl: String) -> NSString {
        
    }
}
