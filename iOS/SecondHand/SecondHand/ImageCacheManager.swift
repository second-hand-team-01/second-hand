//
//  ImageCacheManager.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import UIKit

class ImageCacheManager {
    static let shared = NSCache<NSString, UIImage>()
}
