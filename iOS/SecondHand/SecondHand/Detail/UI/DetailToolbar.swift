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
    var favoriteButtonTapSender: ((Bool) -> ())?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addBarButtonItems()
        self.addActionToFavoriteButton()
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
    
    private func addActionToFavoriteButton() {
        let buttonTapAction = UIAction { _ in
            self.favoriteButtonTapSender?(!self.isItemInFavorites)
        }
        
        self.favoriteButton.primaryAction = buttonTapAction
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    func update(
        price: Int,
        isItemInFavorites: Bool
    ) {
        self.isItemInFavorites = isItemInFavorites
        
        DispatchQueue.main.async {
            self.priceIndicator.title = FormatPriceGenerator.generate(from: price)
            if isItemInFavorites {
                self.favoriteButton.image = Components.inFavoritesImage
            } else {
                self.favoriteButton.image = Components.notInFavoritesImage
            }
        }
    }

    func configureFavoriteButton(isAdding: Bool) {
        let image = isAdding ? Components.inFavoritesImage : Components.notInFavoritesImage
        DispatchQueue.main.async {
            self.favoriteButton.image = image
        }
        
        self.isItemInFavorites = isAdding
    }
    
    enum Components {
        static let inFavoritesImage = UIImage(systemName: "heart.fill")
        static let notInFavoritesImage = UIImage(systemName: "heart")
    }
}
