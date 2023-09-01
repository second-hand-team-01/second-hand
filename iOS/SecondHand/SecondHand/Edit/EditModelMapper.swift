//
//  EditModelMapper.swift
//  SecondHand
//
//  Created by Wood on 2023/08/17.
//

import Foundation

struct EditModelMapper {
    static func convertFrom(
        _ detailModel: DetailModel,
        itemIndex: Int
    ) -> EditModel {
        let imageKeys = detailModel.imageKeys.map {
            if let unwrappedImageKey = $0 {
                return unwrappedImageKey
            }
            return NSString(string: "")
        }
        let itemIndex = itemIndex
        let name = detailModel.productInfo.title
        let price = detailModel.price
        let description = detailModel.productInfo.description
        let locationIndex = 0
        let categoryIndex = 0
        
        return EditModel(
            imageKeys: imageKeys,
            itemIndex: itemIndex,
            name: name,
            price: price,
            description: description,
            locationIndex: locationIndex,
            categoryIndex: categoryIndex
        )
    }
}
