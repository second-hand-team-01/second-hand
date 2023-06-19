//
//  TabBarType.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import Foundation

enum TabBarType {
    case itemList
    
    var title: String {
        switch self {
        case .itemList:
            return "홈화면"
        }
    }
    
    var image: String {
        switch self {
        case .itemList:
            return "house"
        }
    }
}
