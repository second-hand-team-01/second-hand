//
//  DetailUseCase.swift
//  SecondHand
//
//  Created by Wood on 2023/07/14.
//

import Foundation

final class DetailUseCase {
    private var detail: DetailModel?
    private var detailRepository = DetailRepository()
    var dataSender: ((DetailModel) -> ())?

    init(
        detail: DetailModel? = nil,
        detailRepository: DetailRepository = DetailRepository()
    ) {
        self.detail = detail
        self.detailRepository = detailRepository
    }

    func fetchData(item index: Int) {
        Task {
            guard let detailModel = await self.detailRepository.fetchData(item: index) else {
                return
            }

            self.detail = detailModel
            self.dataSender?(detailModel)
        }
    }
    
    func configureFavorites(isAdding: Bool) -> Bool? {
        guard let isAdding = self.detailRepository.requestFavorites(isAdding: isAdding) else {
            return nil
        }
        
        if isAdding {
            self.detail?.isUserInterested = true
        } else {
            self.detail?.isUserInterested = false
        }
        
        return isAdding
    }
}
