//
//  Network.swift
//  SecondHand
//
//  Created by apple on 2023/06/19.
//

import Foundation

protocol ListRemoteDataSource {
    var locationIndex: Int { get set }
    var page: Int { get set }
    
    func requestData(index: Int, pagination: Bool) async -> [ItemListDTO.Item]
}

final class ItemListRemoteDataSource: ListRemoteDataSource {
    private var session = URLSession.shared
    private var decoder = JSONDecoder()

    private var ispagination = false
    var locationIndex = 1041
    var page = 0
    private var baseURLString: String {
        return "\(ServerURL.base)items?locationIdx=\(self.locationIndex)&page=\(self.page)"
    }

    func requestData(index: Int, pagination: Bool = false) async -> [ItemListDTO.Item] {
        self.ispagination = true
        
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
            return itemsDTO
            
        } catch let error {
            guard let decodingError = error as? DecodingError else {
                LogManager.generate(level: .network, "\(self.debugDescription): \(error)")
                return []
            }
            
            LogManager.generate(level: .network, "\(self.debugDescription): \(error)")
            return []
        }
    }
}

extension ItemListRemoteDataSource: CustomDebugStringConvertible {
    var debugDescription: String {
        return "ItemListRemoteDataSource"
    }
}
