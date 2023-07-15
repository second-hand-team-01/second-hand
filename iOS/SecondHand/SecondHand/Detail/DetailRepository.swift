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
    
    func fetchData(item index: Int) async -> DetailModel {
        var itemDetailDTO: ItemDetailDTO?
        
        // 1. Network로부터 데이터를 가져온다.
        let task = Task {
            return await remoteDataSource?.request(item: index)
        }
        
        switch await task.result {
        case .success(let dto):
            itemDetailDTO = dto
        case .failure(_):
            LogManger.generate(level: .network, LogMessage.failToLoadData)
        }
    }
    
    enum LogMessage {
        static let failToLoadData = "데이터를 네트워크로부터 가져오는데 실패했습니다."
    }
}
