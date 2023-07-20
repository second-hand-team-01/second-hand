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

    init(detail: DetailModel? = nil) {
        self.detail = detail
    }

    func fetchData(item index: Int) {
        let task = Task {
            guard let detailModel = await self.detailRepository.fetchData(item: index) else {
                return
            }
            
            self.detail = detailModel
            self.dataSender?(detailModel)
        }
    }
}
