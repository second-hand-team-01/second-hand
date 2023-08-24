//
//  ItemLocalDataSource.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import UIKit.UIImage

protocol ItemListLocalDataSource {
    func checkFileExists(itemIndex: Int) -> Bool
    func fetchImageFilePath(itemIndex: Int) -> NSURL?
    func cacheImage(in url: URL, itemIndex: Int) -> NSURL?
}

struct ItemListLocalDataService: ItemListLocalDataSource {
    private var fileManager = FileManager.default
    private let cacheDirectoryPath: String = {
        let cacheDirectoryURL = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )[0]
        return cacheDirectoryURL.path()
    }()
    private var basePathString: String {
        return "\(self.cacheDirectoryPath)/ItemList"
    }
    
    func checkFileExists(itemIndex: Int) -> Bool {
        let path = "\(self.basePathString)/\(itemIndex).jpeg"
        if self.fileManager.fileExists(atPath: path) {
            return true
        }

        return false
    }
    
    func fetchImageFilePath(itemIndex: Int) -> NSURL? {
        let imageFilePath = "\(self.basePathString)/\(itemIndex).jpeg"
        guard self.checkFileExists(itemIndex: itemIndex) else {
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
        
        LogManager.generate(
            level: .local,
            "\(self.description): " + LogMessage.failToCreateImageFile.message
        )
        return false
    }
    
    private func createDirectory() -> Bool {
        if let _ = try? self.fileManager.createDirectory(
            atPath: self.basePathString,
            withIntermediateDirectories: true
        ) {
           return true
        }
        
        LogManager.generate(
            level: .local,
            "\(self.description): " + LogMessage.failToCreateDirectory.message)
        return false
    }
    
    func cacheImage(
        in url: URL,
        itemIndex: Int
    ) -> NSURL? {
        guard let imageData = try? Data(contentsOf: url) else {
            LogManager.generate(
                level: .local,
                "\(self.description): " + LogMessage.failToLoadImage.message
            )
            return nil
        }

        let imageDirectoryPath = self.basePathString
        let imageFilePath = imageDirectoryPath + "/\(itemIndex).jpeg"
        let imageToStore = UIImage(data: imageData)?.jpegData(compressionQuality: 1.0)

        // 디렉토리 존재하지 않으면 생성 -> 생성 실패시 nil 반환
        if self.checkDirectoryExists(in: imageFilePath) == false {
            if self.createDirectory() { return nil }
        }

        // 디렉토리에 이미지 파일 생성 -> 생성 실패시 nil 반환
        guard self.createImageFile(in: imageFilePath, image: imageToStore) else {
            return nil
        }

        return NSURL(string: imageFilePath)
    }

    enum LogMessage {
        case failToLoadImage
        case failToCreateDirectory
        case failToCreateImageFile
        
        var message: String {
            switch self {
            case .failToLoadImage:
                return "failToLoadImage"
            case .failToCreateDirectory:
                return "failToCreateDirectory"
            case .failToCreateImageFile:
                return "failToCreateImageFile"
            }
        }
    }
}

extension ItemListLocalDataService: CustomStringConvertible {
    var description: String {
        return "ItemListLocalDataSource"
    }
}
