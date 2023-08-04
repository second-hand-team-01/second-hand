//
//  UIViewController+setTitle.swift
//  SecondHand
//
//  Created by Wood on 2023/06/26.
//

import UIKit

extension UIViewController {
    func setTitle(_ title: String) {
        self.title = "\(title)"
    }
    
    func setTabBar(isHiding: Bool) {
        self.tabBarController?.tabBar.isHidden = isHiding
    }
}
