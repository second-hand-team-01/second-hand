//
//  DetailViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

class DetailViewController: UIViewController {
    var scrollView = UIScrollView()
    var detailContentView = DetailContentView(frame: .zero)
    var toolbar = DetailToolbar(frame: .zero)
    var favoriteButton = UIButton()
    var priceLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        detailContentView.configure()
        toolbar.configure(price: "123,000")
        self.tabBarController?.tabBar.isHidden = true
        self.scrollView.contentInsetAdjustmentBehavior = .never
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        addSubViews()
        layoutConstraint()
    }
}
