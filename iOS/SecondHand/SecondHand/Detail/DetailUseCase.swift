//
//  DetailUseCase.swift
//  SecondHand
//
//  Created by Wood on 2023/07/14.
//

import Foundation

final class DetailUseCase {
    private var detail: DetailModel?
    private var detailRepository: DetailRepository
    var dataSender: ((DetailModel) -> ())?
    var favoriteEventFailSender: ((Bool) -> ())?

    init(
        detail: DetailModel? = nil,
        itemIndex: Int
    ) {
        self.detail = detail
        self.detailRepository = DetailRepository(itemIndex: itemIndex)
    }

    func loadData() {
        Task {
            guard let detailModel = await self.detailRepository.fetchData() else {
                return
            }

            self.detail = detailModel
            self.dataSender?(detailModel)
        }
    }

    func configureFavorites(isAdding: Bool) {
        Task {
            guard let isAdded = await self.detailRepository.fetchFavorites(isAdding: isAdding) else {
                self.favoriteEventFailSender?(true)
                return
            }

            self.detail?.isUserInterested = isAdded
            typealias Noti = Notification
            let notificationName = isAdded ? Noti.itemAddedToFavorites : Noti.itemDeletedFromFavorites
            NotificationCenter.default.post(name: notificationName, object: nil)
        }
    }
}
