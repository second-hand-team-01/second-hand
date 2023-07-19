//
//  DetailLocalDataSource.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import UIKit

struct DetailLocalDataSource {
    private var fileManager = FileManager.default
    private let cacheDirectoryPath: String = {
        let path = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )[0]
        return path.absoluteString
    }()
    
    func fetchImageURL(name: NSString) -> NSURL? {
        guard let imageName = name as? String else {
            return nil
        }

        let imageFilePath = cacheDirectoryPath + imageName
        guard fileManager.fileExists(atPath: imageFilePath) else {
            return nil
        }
        return NSURL(string: imageFilePath)
    }
}
