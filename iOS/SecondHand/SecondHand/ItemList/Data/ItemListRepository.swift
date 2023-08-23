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
    
    func fetchData() async -> [ItemModel]
}

struct ItemListRepositoryService: ItemListRepository {
    var remoteDataSource: ItemListRemoteDataSource
    var localDataSource: ItemListLocalDataSource
    
    init(
        remoteDataSource: ItemListRemoteDataSource,
        localDataSource: ItemListLocalDataSource
    ) {
        self.remoteDataSource = remoteDataSource
        self.localDataSource = localDataSource
    }
    
    func fetchData() async -> [ItemModel] {
        <#code#>
    }
}
