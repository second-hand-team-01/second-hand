//
//  DetailToolbar.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//

import UIKit

class DetailToolbar: UIToolbar {
    private let favoriteButton: UIBarButtonItem = {
        let favoriteButton = UIBarButtonItem()
        favoriteButton.image = UIImage(systemName: "heart")
        favoriteButton.style = .plain
        favoriteButton.tintColor = .red
        favoriteButton.customView?.frame.size = CGSize(width: 28, height: 28)
        return favoriteButton
    }()
    private let priceIndicator: UIBarButtonItem = {
        let priceIndicator = UIBarButtonItem()
        priceIndicator.setTitleTextAttributes(
            [NSAttributedString.Key.font: UIFont.typo.footNote],
            for: .normal
        )
        priceIndicator.isEnabled = false
        return priceIndicator
    }()
    private let chatButton: UIBarButtonItem = {
        var configuration = UIButton.Configuration.plain()
        configuration.contentInsets = NSDirectionalEdgeInsets(
            top: 8,
            leading: 16,
            bottom: 8,
            trailing: 16
        )

        let chatButton = UIButton(configuration: configuration)
        chatButton.layer.cornerRadius = 8
        chatButton.tintColor = .white
        chatButton.backgroundColor = UIColor.orange
        chatButton.setTitle("대화중인 채팅방", for: .normal)
        
        return UIBarButtonItem(customView: chatButton)
    }()
    private var isItemInFavorites = false
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addActionToFavoriteButton()
        self.addBarButtonItems()
    }
    
    private func addActionToFavoriteButton() {
        let buttonTapAction = UIAction { _ in
            guard self.isItemInFavorites else {
                self.favoriteButton.image = UIImage(systemName: "heart.fill")
                self.isItemInFavorites = true
                return
            }
            
            self.favoriteButton.image = UIImage(systemName: "heart")
            self.isItemInFavorites = false
        }
        
        self.favoriteButton.primaryAction = buttonTapAction
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func addBarButtonItems() {
        let flexibleSpace = UIBarButtonItem(
            barButtonSystemItem: .flexibleSpace,
            target: self,
            action: nil)
        
        let toolbarItems: [UIBarButtonItem] = [
            self.favoriteButton,
            self.priceIndicator,
            flexibleSpace,
            self.chatButton
        ]
        
        self.setItems(toolbarItems, animated: true)
    }
    
    func update(price: Int) {
        self.priceIndicator.title = FormatPriceGenerator.generate(from: price)
    }
}
