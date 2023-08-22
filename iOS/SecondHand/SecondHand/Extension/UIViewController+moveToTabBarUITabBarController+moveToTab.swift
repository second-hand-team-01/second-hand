//
//  UITabBarController+moveToTab.swift
//  SecondHand
//
//  Created by Wood on 2023/08/19.
//

import UIKit

extension UIViewController {
    enum TabIndex: Int {
        case home = 0
        case account = 1
    }
    
    func moveToTab(to index: TabIndex) {
        self.tabBarController?.selectedIndex = index.rawValue
    }
}
