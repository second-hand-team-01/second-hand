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

        let imageFilePath = "\(self.cacheDirectoryPath + imageName).jpeg"
        guard self.fileManager.fileExists(atPath: imageFilePath) else {
            return nil
        }
        return NSURL(string: imageFilePath)
    }
    
    /// Store Image in url parameter to Local Cache Directory which name is same with name parameter.
    /// Returns if the operation was successful
    func storeImage(
        in url: URL,
        by name: String
    ) -> Bool {
        do {
            let imageData = try Data(contentsOf: url)
            let imageFilePath = "\(self.cacheDirectoryPath + name).jpeg"
            let imageFile = UIImage(data: imageData)?.jpegData(compressionQuality: 1.0)
            guard self.fileManager.createFile(
                atPath: imageFilePath,
                contents: imageFile
            ) else {
                LogManger.generate(level: .local, LogMessage.failToStoreImage)
                return false
            }
            
            return true
        } catch {
            LogManger.generate(level: .local, LogMessage.failToLoadDownloadedImage)
            return false
        }
    }
    
    enum LogMessage {
        static let failToLoadDownloadedImage = "다운로드한 이미지를 가져오는데 실패했습니다."
        static let failToStoreImage = "이미지를 저장하는데 실패했습니다."
    }
}
