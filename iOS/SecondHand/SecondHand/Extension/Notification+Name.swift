//
//  Notification+Name.swift
//  SecondHand
//
//  Created by Wood on 2023/07/26.
//

import Foundation

extension Notification {
    static let userHasBeenSigned = Notification.Name("UserHasBeenSigned")
    static let itemAddedToFavorites = Notification.Name("itemAddedToFavorites")
    static let itemDeletedFromFavorites = Notification.Name("itemDeletedFromFavorites")
    static let itemHasBeenCreated = Notification.Name("itemDidCreated")
    static let itemHasBeenDeleted = Notification.Name("itemDidDeleted")
}
