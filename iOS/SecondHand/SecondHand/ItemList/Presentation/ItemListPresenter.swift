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
            let title = model.name
            let location = model.location
            let passedTime = PassedTimeGenerator.generate(from: model.postedAt)
            let price = model.price
            let status = StatusLabel.Status(rawValue: model.status) ?? StatusLabel.Status.forSale
            let interestCount = "\(model.interestCount)"
            let chatCount = "\(model.chatCount)"
            
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
