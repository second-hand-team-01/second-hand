//
//  DetailRepository.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import Foundation

struct DetailRepository {
    private var remoteDataSource = DetailRemoteDataSource()
    private var localDataSource = DetailLocalDataSource()
    private var detailModelMapper = DetailModelMapper()
    
    func fetchData(item index: Int) async -> DetailModel? {
        // 1. Network로부터 데이터를 가져온다.
        guard let fetchedData = await remoteDataSource.request(item: index)?.data else {
            LogManger.generate(level: .repository, LogMessage.failToLoadData)
            return nil
        }
        // 서버에 이미지가 없는지 확인
        let imageKey = NSString(string: "\(index)")
        guard !fetchedData.imageUrl.isEmpty else {
            LogManger.generate(level: .repository, LogMessage.imageDidNotExisted)
            return detailModelMapper.convert(by: fetchedData, with: [])
        }
        
        // 2. 캐싱된 이미지 수와 동일한지 확인
        let loadedImagesCount = fetchedData.imageUrl.count
        let imageMemoryCacheKeys = (0..<loadedImagesCount).map { (imageIndex: Int) in
            return NSString(string: "\(index)/\(imageIndex)")
        }
        // 로드한 이미지 수가 캐싱된 이미지 수와 동일하다면, 매핑한 모델 반환
        let cachedImagesCount = ImageCacheManager.getCachedCount(of: index)
        guard loadedImagesCount != cachedImagesCount else {
            return detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
        }

        // 3. 메모리 캐시에 존재하는지 확인
        // 메모리 캐시에 존재하지 않는 이미지URL들만 추출한 배열 생성
        let nonCachedImages = imageMemoryCacheKeys.enumerated().filter { (index: Int, key: NSString) in
            return ImageCacheManager.cacheExists(key: key)
        }
        // 모두 디스크 캐시에 존재한다면, 메모리 캐시에 저장
        guard !nonCachedImages.isEmpty else {
            imageMemoryCacheKeys.forEach { (key: NSString) in
                if let imageFilePath = localDataSource.fetchImageURL(name: key) {
                    ImageCacheManager.shared.setObject(
                        imageFilePath,
                        forKey: key
                    )
                }
            }
            
            return detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
        }
        
        // 4. 존재하지 않는 이미지 서버로 부터 다운로드 후 디스크 캐시에 저장
        for (imaegIndex, _) in nonCachedImages {
            let downloadURLString = fetchedData.imageUrl[imaegIndex]
            guard let downloadedImageURL = await remoteDataSource.downloadImage(from: downloadURLString) else {
                continue
            }
            
            let fileName = "\(index)/\(imaegIndex)"
            if localDataSource.storeImage(
                in: downloadedImageURL,
                by: fileName
            ) {
                if let urlKey = NSURL(string: fileName) {
                    ImageCacheManager.shared.setObject(
                        urlKey,
                        forKey: NSString(string: fileName)
                    )
                }
            }
        }
        
        return detailModelMapper.convert(by: fetchedData, with: imageMemoryCacheKeys)
    }
    
    enum LogMessage {
        static let failToLoadData = "데이터를 네트워크로부터 가져오는데 실패했습니다."
        static let imageDidNotExisted = "이미지가 로드되지 않았습니다."
        static let failToLoadCachedImageCount = "해당 상품 정보에 대한 이미지 숫자가 캐시에 존재하지 않습니다."
    }
}
