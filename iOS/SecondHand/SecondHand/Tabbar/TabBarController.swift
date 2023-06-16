//
//  TabBarController.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

final class TabBarViewController: UITabBarController {
    private let itemListView = UINavigationController(rootViewController: ItemListViewController())
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setViewControllers([itemListView], animated: false)
        configureTabBarColor()
        configureTabBarItem()
    }
    
    private func configureTabBarColor() {
        self.view.backgroundColor = .systemBackground
        self.view.tintColor = .black
    }
    
    private func configureTabBarItem() {
        itemListView.tabBarItem = UITabBarItem(title: TabBarType.itemList.title, image: UIImage(systemName: TabBarType.itemList.image), tag: 0)
    }
}
