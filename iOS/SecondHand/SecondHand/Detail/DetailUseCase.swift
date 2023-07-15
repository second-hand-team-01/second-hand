//
//  DetailUseCase.swift
//  SecondHand
//
//  Created by Wood on 2023/07/14.
//

import Foundation

final class DetailUseCase {
    private var detail: DetailModel
    private var detailRepository: DetailRepository?
    
    init(detail: DetailModel) {
        self.detail = detail
    }
    
    func fetchData(item index: Int) {
        Task {
            guard let detailModel = await self.detailRepository?.fetchData(item: index) else {
                return
            }
            
            self.detail = detailModel
        }
    }
}
