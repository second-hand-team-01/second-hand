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
    var favoriteButtonTapSender: ((Bool) -> ())?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.favoriteButton = self.makeFavoriteButton()
        self.chatButton = self.makeChatButton()
        self.priceLabel.setTitleTextAttributes([
            NSAttributedString.Key.font: UIFont.typo.footNote
        ], for: .normal)
        self.addBarButtonItems()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    @objc func addFavorite(_ sender: UIBarButtonItem) {
        guard self.isFavoriteButtonSelected else {
            sender.image = UIImage(systemName: "heart.fill")
            self.isFavoriteButtonSelected = true
            return
        }
        sender.image = UIImage(systemName: "heart")
        self.isFavoriteButtonSelected = false
    }
    
    private func makeFavoriteButton() -> UIBarButtonItem {
        let item = UIBarButtonItem(
            image: UIImage(systemName: "heart"),
            style: .plain,
            target: self,
            action: #selector(self.addFavorite)
        )
        item.tintColor = UIColor.red
        item.customView?.frame.size = CGSize(width: 28, height: 28)
        
        return item
    }
    
    @objc private func moveToChat(_ sender: UIBarButtonItem) {
        
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
                         action: #selector(self.moveToChat),
                         for: .touchUpInside)
        
        return UIBarButtonItem(customView: button)
    }
    
    private func addFlexibleSpace() -> UIBarButtonItem {
        let space = UIBarButtonItem(
            barButtonSystemItem: .flexibleSpace,
            target: self,
            action: nil)
        return space
    }
    
    private func addBarButtonItems() {
        let toolbarItems: [UIBarButtonItem] = [
            self.favoriteButton,
            self.priceLabel,
            self.addFlexibleSpace(),
            self.chatButton
        ]
        
        self.setItems(toolbarItems, animated: true)
    }
    
    func update(price: Int) {
        self.priceLabel.title = FormatPriceGenerator.generate(from: price)
    }
}
