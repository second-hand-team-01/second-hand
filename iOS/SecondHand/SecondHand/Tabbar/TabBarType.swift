//
//  TabBarType.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import Foundation

enum TabBarType {
    case itemList
    case account
    
    var title: String {
        switch self {
        case .itemList:
            return "홈화면"
        case .account:
            return "내 계정"
        }
    }
    
    var image: String {
        switch self {
        case .itemList:
            return "house"
        case .account:
            return "person"
        }
    }
}
