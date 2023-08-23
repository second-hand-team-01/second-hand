//
//  Network.swift
//  SecondHand
//
//  Created by apple on 2023/06/19.
//

import Foundation

protocol ItemListRemoteDataSource {
    var locationIndex: Int { get set }
    var page: Int { get set }
    
    func requestData() async -> [ItemListDTO.Item]
    func download(imageUrl: String) async -> URL?
}

final class ItemListRemoteDataService: ItemListRemoteDataSource {
    private var session = URLSession.shared
    private var decoder = JSONDecoder()

    private var hasNextPage = false
    var locationIndex = 1041
    var page = 0
    private var baseURLString: String {
        return "\(ServerURL.base)items?locationIdx=\(self.locationIndex)&page=\(self.page)"
    }

    func requestData() async -> [ItemListDTO.Item] {
        self.hasNextPage = true
        
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
            self.hasNextPage = decodedData.data.hasNext
            
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
            let (DownloadedImageUrl, response) = try await self.session.download(from: url)
            
            guard URLResponse.validate(response) else {
                return nil
            }
            
            return DownloadedImageUrl
            
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
