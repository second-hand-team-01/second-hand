//
//  Network.swift
//  SecondHand
//
//  Created by apple on 2023/06/19.
//

import Foundation

protocol ItemListRemoteDataSource {
    func requestUserLocation() async -> UserLocationDTO.UserLocation?
    func requestData(
        locationIndex: Int,
        isRefresh: Bool
    ) async -> [ItemListDTO.Item]
    func download(imageUrl: String) async -> URL?
}

final class ItemListRemoteDataService: ItemListRemoteDataSource {
    private var session = URLSession.shared
    private var decoder = JSONDecoder()

    private var hasNextPage = true
    private var page = 0
    
    private var defaultLocation = UserLocationDTO.UserLocation(
        main: UserLocationDTO.Location(locationIdx: 1041, locationName: "역삼1동")
    )

    // MARK: 지역 정보 조회
    
    private func makeLocationRequest() -> URLRequest? {
        let urlString = ServerURL.base + "location"
        guard let url = URL(string: urlString) else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return nil
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        let accessToken = "Bearer " + SecretKeys.accessToken
        request.addValue(accessToken, forHTTPHeaderField: "Authorization")
        
        return request
    }

    func requestUserLocation() async -> UserLocationDTO.UserLocation? {
        guard SecretKeys.accessToken.isEmpty == false else {
            return self.defaultLocation
        }

        guard let locationRequest = self.makeLocationRequest() else {
            return nil
        }

        do {
            let (data, response) = try await self.session.data(for: locationRequest)
            
            guard URLResponse.validate(response) else {
                return nil
            }
            
            let decodedData = try self.decoder.decode(UserLocationDTO.self, from: data)
            return decodedData.data
            
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            } else {
                LogManager.generate(level: .network, "\(error)")
            }

            return nil
        }
    }
    
    // MARK: 아이템 목록 조회

    func requestData(locationIndex: Int, isRefresh: Bool = false) async -> [ItemListDTO.Item] {
        if isRefresh {
            self.page = 0
            self.hasNextPage = true
        }

        guard self.hasNextPage else {
            return []
        }

        let parameterString = "items?locationIdx=\(locationIndex)&page=\(self.page)"
        let urlString = ServerURL.base + parameterString
        guard let url = URL(string: urlString) else {
            LogManager.generate(level: .network, "\(self.debugDescription): \(NetworkError.badURL.message)")
            return []
        }

        do {
            let (data, response) = try await self.session.data(from: url)

            guard URLResponse.validate(response) else {
                return []
            }
            
            let decodedData = try self.decoder.decode(ItemListDTO.self, from: data)

            let dtoData = decodedData.data
            let itemsDTO = dtoData.items
            self.hasNextPage = dtoData.hasNext
            if self.hasNextPage {
                self.page += 1
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
    
    // MARK: 상품 이미지 다운로드
    
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
