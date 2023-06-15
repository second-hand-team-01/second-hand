//
//  DetailViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

class DetailViewController: UIViewController {
    var scrollView = UIScrollView()
    
    var detailContentView = DetailConetntView()
    var toolbar = UIToolbar()
    var favoriteButton = UIButton()
    var priceLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        detailContentView.configure()
        self.tabBarController?.tabBar.isHidden = true
        self.toolbar = makeToolbar()
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        layoutScrollView()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        updateContentSize()
    }
    
    func updateContentSize() {
        let contentRect: CGRect = scrollView.subviews.reduce(into: .zero) { rect, view in
            rect = rect.union(view.frame)
        }
        scrollView.contentSize = contentRect.size
        detailContentView.heightAnchor.constraint(equalToConstant: contentRect.size.height).isActive = true
    }

    private func makeToolbar() -> UIToolbar {
        let toolbar = UIToolbar()
        
        let chatButton = UIButton()
        chatButton.setTitle("채팅방으로 이동", for: .normal)
        chatButton.setTitleColor(.orange, for: .normal)
        
        toolbar.items = [
            UIBarButtonItem(title: "150,000원",
                            image: UIImage(systemName: "house")),
            UIBarButtonItem(customView: makeFavoriteButton())
        ]
        
        return toolbar
    }

    private func makeFavoriteButton() -> UIButton {
        let button = UIButton()
        button.setImage(UIImage(systemName: "heart"), for: .normal)
        return button
    }
}
