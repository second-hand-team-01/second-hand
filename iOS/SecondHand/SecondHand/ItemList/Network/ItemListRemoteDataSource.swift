//
//  Network.swift
//  SecondHand
//
//  Created by apple on 2023/06/19.
//

import Foundation

protocol ItemListRemoteDataSource {
    func requestUserLocation() async -> UserLocationDTO.UserLocation
    func requestData(locationIndex: Int) async -> [ItemListDTO.Item]
    func download(imageUrl: String) async -> URL?
}

final class ItemListRemoteDataService: ItemListRemoteDataSource {
    private var session = URLSession.shared
    private var decoder = JSONDecoder()

    private var hasNextPage = true
    private lazy var locationIndex: Int = 0
    private var page = 0
    private var baseURLString: String {
        return "\(ServerURL.base)items?locationIdx=\(self.locationIndex)&page=\(self.page)"
    }
    
    //TODO: 사용자 지역 정보 조회 구현
    func requestUserLocation() async -> UserLocationDTO.UserLocation {
        let main = UserLocationDTO.Location(locationIdx: 5, locationName: "창성동")
        let sub = UserLocationDTO.Location(locationIdx: 6, locationName: "통의동")
        
        return UserLocationDTO.UserLocation(main: main, sub: sub)
    }

    func requestData(locationIndex: Int) async -> [ItemListDTO.Item] {
        guard self.hasNextPage else {
            return []
        }
        
        if self.locationIndex != locationIndex {
            self.locationIndex = locationIndex
            self.page = 0
        }
        
        guard let url = URL(string: self.baseURLString) else {
            LogManager.generate(level: .network, "\(self.debugDescription): \(NetworkError.badURL.message)")
            return []
        }

        do {
            let (data, response) = try await self.session.data(from: url)
            
            guard URLResponse.validate(response) else {
                return []
            }
            
            let decodedData = try self.decoder.decode(ItemListDTO.self, from: data)
            let itemsDTO = decodedData.data.items
            if decodedData.data.hasNext {
                self.page += 1
                self.hasNextPage = true
            } else {
                self.hasNextPage = false
            }
            
            return itemsDTO
            
        } catch let error {
            guard let decodingError = error as? DecodingError else {
                LogManager.generate(level: .network, "\(self.debugDescription): \(error)")
                return []
            }
            
            LogManager.generate(
                level: .network,
                "\(self.debugDescription): \(error)"
            )
            return []
        }
    }
    
    func download(imageUrl: String) async -> URL? {
        guard let url = URL(string: imageUrl) else {
            LogManager.generate(level: .network, "\(self.debugDescription): \(NetworkError.badURL.message)")
            return nil
        }
        
        do {
            let (downloadedImageUrl, response) = try await self.session.download(from: url)
            
            guard URLResponse.validate(response) else {
                return nil
            }
            
            return downloadedImageUrl
            
        } catch let error {
            LogManager.generate(
                level: .network,
                "\(self.debugDescription): \(error)"
            )
            return nil
        }
    }
}

extension ItemListRemoteDataService: CustomDebugStringConvertible {
    var debugDescription: String {
        return "ItemListRemoteDataSource"
    }
}
