//
//  ImageCacheManager.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import Foundation

struct ImageCacheManager {
    static let shared = NSCache<NSString, NSURL>()
    static let sharedForItemList = NSCache<ImageKey, NSURL>()
    
    private init() {}
    
    static func cacheExists(key: NSString) -> Bool {
        if let isExist = self.shared.object(forKey: key) {
            return true
        }
        return false
    }
    
    static func getCachedCount(of image: Int) -> Int {
        (0..<10).filter { (index: Int) in
            return self.cacheExists(
                key: NSString(
                    string: "\(image)/\(index)"
                )
            )
        }.count
    }
}

struct DataCacheManager {
    static let shared = NSCache<NSString, NSData>()
    private init() {}
    
    static func find(by key: NSString) -> Data? {
        let objectForKey = shared.object(forKey: key) as? Data
        return objectForKey
    }
    
    static func store(
        key: NSString,
        object: Data
    ) {
        let key = key
        let object = NSData(data: object)
        shared.setObject(object, forKey: key)
    }
}
