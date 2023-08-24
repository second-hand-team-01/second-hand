//
//  ItemListPresenter.swift
//  SecondHand
//
//  Created by Wood on 2023/08/23.
//

import Foundation

protocol ItemListPresenter {
    func convert(from models: [ItemModel]) -> [ItemViewModel]
}

struct ItemListPresentService: ItemListPresenter {
    func convert(from models: [ItemModel]) -> [ItemViewModel] {
        let viewModels = models.map { (model: ItemModel) in
            let itemIndex = model.itemIndex
            let imageKey = ImageKey(value: model.imageKey)
            var title = model.name
            var location = model.location
            var passedTime = PassedTimeGenerator.generate(from: model.postedAt)
            var price = model.price
            var status = model.status
            var interestCount = "\(model.interestCount)"
            var chatCount = "\(model.chatCount)"
            
            return ItemViewModel(
                itemIndex: itemIndex,
                imageKey: imageKey,
                title: title,
                location: location,
                passedTime: passedTime,
                price: price,
                status: status,
                interestCount: interestCount,
                chatCount: chatCount
            )
        }

        return viewModels
    }
}
