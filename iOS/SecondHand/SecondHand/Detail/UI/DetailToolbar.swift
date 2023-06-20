//
//  DetailToolbar.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//

import UIKit

class DetailToolbar: UIToolbar {
    private var favoriteButton = UIBarButtonItem()
    private var priceLabel = UIBarButtonItem()
    private var chatButton = UIBarButtonItem()
    private var isFavoriteButtonSelected = false
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        favoriteButton = makeFavoriteButton()
        chatButton = makeChatButton()
        self.priceLabel.setTitleTextAttributes([
            NSAttributedString.Key.font: UIFont.typo.footNote
        ], for: .normal)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        addItems()
    }
    
    func configure(price: String) {
        self.priceLabel.title = "\(price)"
    }
    
    private func makeFavoriteButton() -> UIBarButtonItem {
        let item = UIBarButtonItem(
            image: UIImage(systemName: "heart"),
            style: .plain,
            target: self,
            action: #selector(addFavorite)
        )
        item.tintColor = UIColor.red
        item.customView?.frame.size = CGSize(width: 28, height: 28)
        
        return item
    }
    
    @objc func addFavorite(_ sender: UIBarButtonItem) {
        guard isFavoriteButtonSelected else {
            sender.image = UIImage(systemName: "heart.fill")
            isFavoriteButtonSelected = true
            return
        }
        sender.image = UIImage(systemName: "heart")
        isFavoriteButtonSelected = false
    }
    
    private func makeChatButton() -> UIBarButtonItem {
        var configuration = UIButton.Configuration.plain()
        configuration.contentInsets = NSDirectionalEdgeInsets(
            top: 8,
            leading: 16,
            bottom: 8,
            trailing: 16
        )
        
        let button = UIButton(configuration: configuration)
        button.layer.cornerRadius = 8
        button.tintColor = .white
        button.backgroundColor = UIColor.orange
        button.setTitle("대화중인 채팅방", for: .normal)
        button.addTarget(self,
                         action: #selector(moveToChat),
                         for: .touchUpInside)
        
        return UIBarButtonItem(customView: button)
    }
    
    @objc func moveToChat(_ sender: UIBarButtonItem) {
        
    }
    
    private func addItems() {
        let toolbarItems: [UIBarButtonItem] = [
            self.favoriteButton,
            self.priceLabel,
            addFlexibleSpace(),
            self.chatButton
        ]
        
        self.setItems(toolbarItems, animated: true)
    }
    
    private func addFlexibleSpace() -> UIBarButtonItem {
        let space = UIBarButtonItem(
            barButtonSystemItem: .flexibleSpace,
            target: self,
            action: nil)
        return space
    }
}
