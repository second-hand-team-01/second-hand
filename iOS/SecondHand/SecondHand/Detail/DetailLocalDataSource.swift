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
        let cacheDirectoryURL = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )[0]
        return cacheDirectoryURL.path()
    }()
    private let itemIndex: Int
    
    init(itemIndex: Int) {
        self.itemIndex = itemIndex
    }
    
    func checkFileExists(name: String) -> Bool {
        let path = "\(cacheDirectoryPath)\(name).jpeg"
        if self.fileManager.fileExists(atPath: path) {
            return true
        }
        return false
    }
    
    func fetchImageURL(name: NSString) -> NSURL? {
        let imageName = name as String
        let imageFilePath = "\(self.cacheDirectoryPath)\(imageName).jpeg"

        guard self.fileManager.fileExists(atPath: imageFilePath) else {
            return nil
        }
        
        return NSURL(string: imageFilePath)
    }
    
    private func checkDirectoryExists(in path: String) -> Bool {
        var isDirectory: ObjCBool = true
        if self.fileManager.fileExists(
            atPath: path,
            isDirectory: &isDirectory
        ) {
            return true
        }
        
        return false
    }
    
    private func createDirectory(in path: String) -> Bool {
        if let _ = try? self.fileManager.createDirectory(
            atPath: path,
            withIntermediateDirectories: true
        ) {
            return true
        }
        
        LogManager.generate(level: .local, LogMessage.failToCreateDirectory)
        return false
    }
    
    private func createImageFile(
        in path: String,
        image: Data?
    ) -> Bool {
        if self.fileManager.createFile(
            atPath: path,
            contents: image
        ) {
            return true
        }
        
        LogManager.generate(level: .local, LogMessage.failToCreateFile)
        return true
    }
    
    /// Store Image in url parameter to Local Cache Directory which name is same with name parameter.
    /// Returns if the operation was successful
    func storeImageToDiskCache(
        in url: URL,
        item index: Int,
        image number: Int
    ) -> Bool {
        // 1. 임시 저장소에 있는 다운로드한 이미지 데이터를 불러온다.
        guard let imageData = try? Data(contentsOf: url) else {
            LogManager.generate(level: .local, LogMessage.failToLoadDownloadedImage)
            return false
        }
        let imageDirectoryPath = "\(self.cacheDirectoryPath)\(index)"
        let imageFilePath = imageDirectoryPath + "/\(number).jpeg"
        let imageFile = UIImage(data: imageData)?.jpegData(compressionQuality: 1.0)

        // 2. 아이템 고유번호에 해당하는 디렉토리가 존재하면 바로 파일을 생성하고 결과를 리턴한다.
        guard !self.checkDirectoryExists(in: imageDirectoryPath) else {
            return self.createImageFile(in: imageFilePath, image: imageFile)
        }
        
        // 3. 디렉토리가 존재하지 않는다면, 디렉토리를 생성한다.
        guard self.createDirectory(in: imageDirectoryPath) else {
            return false
        }
        
        // 4. 디렉토리 생성 후, 이미지 파일을 디스크 캐시에 생성하고 결과를 리턴한다.
        guard self.createImageFile(in: imageFilePath, image: imageFile) else {
            return false
        }
        
        if let fileURL = NSURL(string: imageFilePath) {
            ImageCacheManager.shared.setObject(
                fileURL,
                forKey: NSString(string: "\(self.itemIndex)/\(index)")
            )
        }
        return true
    }
    
    enum LogMessage {
        static let failToCreateDirectory = "디렉토리를 생성하는데 실패했습니다."
        static let failToLoadDownloadedImage = "다운로드한 이미지를 가져오는데 실패했습니다."
        static let failToCreateFile = "파일을 생성하는데 실패했습니다."
    }
}
