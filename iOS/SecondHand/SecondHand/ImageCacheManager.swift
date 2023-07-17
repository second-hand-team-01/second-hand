//
//  ImageCacheManager.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import Foundation

struct ImageCacheManager {
    static let counter = NSCache<NSString, NSString>()
    static let saver = NSCache<NSString, NSURL>()
    private init() {}
    
    static func check(key: String) -> Bool {
        if let isExist = self.saver.object(
            forKey: NSString(
                string: key
            )
        ) {
            return true
        }
        return false
    }
}
