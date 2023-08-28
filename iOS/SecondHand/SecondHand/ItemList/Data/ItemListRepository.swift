//
//  ItemListRepository.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

protocol ItemListRepository {
    var remoteDataSource: ItemListRemoteDataSource { get }
    var localDataSource: ItemListLocalDataSource { get }
    
    func fetchUserLocation() async -> UserLocationDTO.UserLocation
    func fetchItemList(locationIndex: Int) async -> [ItemModel]
}

final class ItemListRepositoryService: ItemListRepository {
    var remoteDataSource: ItemListRemoteDataSource
    var localDataSource: ItemListLocalDataSource

    init(
        remoteDataSource: ItemListRemoteDataSource,
        localDataSource: ItemListLocalDataSource
    ) {
        self.remoteDataSource = remoteDataSource
        self.localDataSource = localDataSource
    }
    
    func fetchUserLocation() async -> UserLocationDTO.UserLocation {
        return await self.remoteDataSource.requestUserLocation()
    }
    
    func fetchItemList(locationIndex: Int) async -> [ItemModel] {
        let requestedData = await self.remoteDataSource.requestData(locationIndex: locationIndex)
        
        guard requestedData.isEmpty == false else {
            return []
        }
        
        var imageUrls: [Int: String] = [:]
        requestedData.forEach { (itemDTO: ItemListDTO.Item) in
            imageUrls[itemDTO.itemIdx] = itemDTO.imageUrl
        }
        
        // 모델 생성
        let itemModels = requestedData.map { (itemDTO: ItemListDTO.Item) in
            return ItemModelMapper.convert(from: itemDTO)
        }
        
        // 이미지가 메모리 캐시에 없는 상품들만 추출
        let nonMemoryCachedImages = itemModels.filter { (item: ItemModel) in
            let imageKey = ImageKey(value: item.imageKey)
            return ImageCacheManager.sharedForItemList.object(forKey: imageKey) == nil
        }

        // 이미 모든 이미지가 메모리 캐시에 있으면 mapping한 모델 리스트 반환
        guard nonMemoryCachedImages.isEmpty == false else {
            return itemModels
        }

        // 디스크 캐시에 존재하는 파일들 불러와 메모리 캐시에 저장
        var nonDiskCachedImages: [ItemModel] = []
        nonMemoryCachedImages.forEach { (item: ItemModel) in
            if let imageFilePath = self.localDataSource.fetchImageFilePath(itemIndex: item.itemIndex) {
                let imageKey = ImageKey(value: item.imageKey)
                ImageCacheManager.sharedForItemList.setObject(imageFilePath, forKey: imageKey)
            } else {
                nonDiskCachedImages.append(item)
            }
        }

        // 이미지 파일들이 모두 디스크 캐시에 존재하면 mapping한 모델 리스트 반환
        guard !nonDiskCachedImages.isEmpty else {
            return itemModels
        }

        // 디스크에 존재하지 않는 파일들 다운로드 후 파일 경로 받아와 디스크 / 메모리 캐시에 저장 후 모델 반환
        for nonDiskCachedImage in nonDiskCachedImages {
            let itemIndex = nonDiskCachedImage.itemIndex
            guard let imageUrl = imageUrls[itemIndex] else { continue }
            guard let imagePath = await self.remoteDataSource.download(imageUrl: imageUrl) else { continue }
            guard let imageFilePath = self.localDataSource.cacheImage(in: imagePath, itemIndex: itemIndex) else { continue }
            let imageKey = ImageKey(value: nonDiskCachedImage.imageKey)
            ImageCacheManager.sharedForItemList.setObject(imageFilePath, forKey: imageKey)
        }

        return itemModels
    }
}
