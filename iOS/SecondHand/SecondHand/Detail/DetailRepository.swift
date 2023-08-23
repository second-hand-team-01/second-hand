//
//  DetailRepository.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import Foundation

struct DetailRepository {
    private var detailRemoteDataSource: DetailRemoteDataSource
    private var detailLocalDataSource: DetailLocalDataSource
    private var detailModelMapper = DetailModelMapper()
    private let itemIndex: Int
    
    init(
        itemIndex: Int = 0,
        detailModelMapper: DetailModelMapper = DetailModelMapper()
    ) {
        self.itemIndex = itemIndex
        self.detailRemoteDataSource = DetailRemoteDataSource(itemIndex: itemIndex)
        self.detailLocalDataSource = DetailLocalDataSource(itemIndex: itemIndex)
        self.detailModelMapper = detailModelMapper
    }
    
    func fetchData() async -> DetailModel? {
        // 1. Network로부터 데이터를 가져온다.
        guard let fetchedData = await detailRemoteDataSource.requestData()?.data else {
            LogManager.generate(level: .repository, LogMessage.failToLoadData)
            return nil
        }
        // 서버에 이미지가 없는지 확인
        guard !fetchedData.imageUrl.isEmpty else {
            LogManager.generate(level: .repository, LogMessage.imageDidNotExisted)
            return detailModelMapper.convert(by: fetchedData, with: [])
        }
        
        // 2. 캐싱된 이미지 수와 동일한지 확인
        let loadedImagesCount = fetchedData.imageUrl.count
        let imageMemoryCacheKeys = (0..<loadedImagesCount).map { (imageIndex: Int) in
            return NSString(string: "\(self.itemIndex)/\(imageIndex)")
        }
        // 로드한 이미지 수가 캐싱된 이미지 수와 동일하다면, 매핑한 모델 반환
        let cachedImagesCount = ImageCacheManager.getCachedCount(of: self.itemIndex)
        guard loadedImagesCount != cachedImagesCount else {
            return self.detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
        }

        // 3. 메모리 캐시에 존재하는지 확인
        // 메모리 캐시에 존재하지 않는 이미지URL들만 추출한 배열 생성
        let nonMemoryCachedImages = imageMemoryCacheKeys.filter { (key: NSString) in
            return !ImageCacheManager.cacheExists(key: key)
        }
        // 모두 메모리 캐시에 존재하는 경우에는 바로 모델을 리턴
        guard !nonMemoryCachedImages.isEmpty else {
            return self.detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
        }
        
        // 4. 디스크 캐시에 존재하는 이미지들은 가져와서 메모리 캐시에 저장.
        // 디스크 캐시에 존재하는 파일들만 추출
        let nonDiskCachedImages = nonMemoryCachedImages.enumerated().filter { (imageNumber: Int, _) in
            return !self.detailLocalDataSource.checkFileExists(name: "\(self.itemIndex)/\(imageNumber)")
        }
        // 모두 디스크 캐시에 이미 존재한다면, 메모리 캐시에 저장 후 모델 리턴
        guard nonDiskCachedImages.count > 0 else {
            nonMemoryCachedImages.forEach { (key: NSString) in
                if let imageFilePath = self.detailLocalDataSource.fetchImageURL(name: key) {
                    ImageCacheManager.shared.setObject(
                        imageFilePath,
                        forKey: key
                    )
                }
            }
            
            return self.detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
        }
        
        // 4. 존재하지 않는 이미지 서버로 부터 다운로드 후 디스크 캐시에 저장
        for (imageIndex, _) in nonDiskCachedImages {
            let downloadURLString = fetchedData.imageUrl[imageIndex]
            guard let downloadedImageURL = await self.detailRemoteDataSource.downloadImage(from: downloadURLString) else {
                continue
            }

            self.detailLocalDataSource.storeImageToDiskCache(
                in: downloadedImageURL,
                item: self.itemIndex,
                image: imageIndex
            )
        }
        
        return self.detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
    }
    
    func fetchFavorites(isAdding: Bool) async -> Bool? {
        guard let result = await self.detailRemoteDataSource.requestFavorites(isAdding: isAdding) else {
            return nil
        }
        return result
    }
    
    enum LogMessage {
        static let failToLoadData = "데이터를 네트워크로부터 가져오는데 실패했습니다."
        static let imageDidNotExisted = "이미지가 로드되지 않았습니다."
        static let failToLoadCachedImageCount = "해당 상품 정보에 대한 이미지 숫자가 캐시에 존재하지 않습니다."
    }
}
