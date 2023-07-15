//
//  ImageCacheManager.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import Foundation

struct ImageCacheManager {
    static let shared = NSCache<NSString, NSString>()
    private init() {}
}
