//
//  DetailRepository.swift
//  SecondHand
//
//  Created by Wood on 2023/07/15.
//

import Foundation

struct DetailRepository {
    private var remoteDataSource: DetailRemoteDataSource?
    private var localDataSource: DetailLocalDataSource?
    private var detailModelMapper: DetailModelMapper?
    
    private func validateImages(data: ItemDetailDTO) -> Bool {
        
    }
    
    func fetchData(item index: Int) async -> DetailModel? {
        // 1. Network로부터 데이터를 가져온다.
        guard let fetchedData = await remoteDataSource?.request(item: index)?.data else {
            LogManger.generate(level: .network, LogMessage.failToLoadData)
            return nil
        }

        // 서버에 이미지가 없는지 확인
        let imageKey = NSString(string: "\(index)")
        guard !fetchedData.imageUrl.isEmpty else {
            LogManger.generate(level: .network, LogMessage.imageDidNotExisted)
            return detailModelMapper?.convert(by: fetchedData, with: [])
        }

        // 2. 캐싱된 이미지 수와 동일한지 확인
        guard let cachedImagesCount = ImageCacheManager.counter.object(forKey: imageKey)?.intValue as? Int else {
            return detailModelMapper?.convert(by: fetchedData, with: [])
        }
        
        guard fetchedData.imageUrl.count != cachedImagesCount else {
            let imageCaches = (0..<cachedImagesCount).map { (imageIndex: Int) in
                return NSString(string: "\(index)/\(imageIndex)")
            }

            return detailModelMapper?.convert(by: fetchedData, with: imageCaches)
        }
        
        // 3. 디스크 캐시에 이미지 존재하는지 확인
        
//        let imageURLs = (0..<cachedImagesCount).map { (imageIndex: Int) in
//            let key = NSString(string: "\(index)/\(imageIndex)")
//            return ImageCacheManager.saver.object(forKey: key)
//        }
    }
    
    enum LogMessage {
        static let failToLoadData = "데이터를 네트워크로부터 가져오는데 실패했습니다."
        static let imageDidNotExisted = "이미지가 로드되지 않았습니다."
    }
}
