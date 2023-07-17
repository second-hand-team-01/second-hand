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
    
    private func compare(images: [Data?]) {
        
    }
    
    func fetchData(item index: Int) async -> DetailModel? {
        let path = NSString(string: "\(index)")
        
        // 1. Network로부터 데이터를 가져온다.
        guard let fetchedData = await remoteDataSource?.request(item: index)?.data else {
            LogManger.generate(level: .network, LogMessage.failToLoadData)
            return nil
        }

        // 서버에 이미지가 없는지 확인
        guard !fetchedData.imageUrl.isEmpty else {
            LogManger.generate(level: .network, LogMessage.imageDidNotExisted)
            return convertToModel(by: fetchedData, with: [])
        }
        
    enum LogMessage {
        static let failToLoadData = "데이터를 네트워크로부터 가져오는데 실패했습니다."
        static let imageDidNotExisted = "이미지가 로드되지 않았습니다."
    }
}
