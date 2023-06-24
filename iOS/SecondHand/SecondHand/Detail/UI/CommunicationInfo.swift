//
//  CommunicationInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/19.
//

import UIKit

class CommunicationInfo: UIView {
    private var chatCountLabel = UILabel()
    private var favoriteCountLabel = UILabel()
    private var viewsCountLabel = UILabel()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.chatCountLabel.text = "채팅 0"
        self.favoriteCountLabel.text = "관심 0"
        self.viewsCountLabel.text = "조회 1"
        setFont()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layoutConstraints()
    }
    
    func configure(
        chatCount: Int,
        favoriteCount: Int,
        viewsCount: Int
    ) {
        self.chatCountLabel.text = "채팅 \(chatCount)"
        self.favoriteCountLabel.text = "관심 \(favoriteCount)"
        self.viewsCountLabel.text = "조회 \(viewsCount)"
    }
    
    private func addSubviews() {
        let subViews = [
            chatCountLabel,
            favoriteCountLabel,
            viewsCountLabel
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func setFont() {
        let labels = [
            chatCountLabel,
            favoriteCountLabel,
            viewsCountLabel
        ]
        
        labels.forEach {
            $0.font = .typo.footNote
            $0.textColor = ColorPalette.neutral.textWeak
        }
    }
}

// MARK: - Constraint 설정
extension CommunicationInfo {
    private func layoutConstraints() {
        addSubviews()
        layoutChatCountLabel()
        layoutFavoriteCountLabel()
        layoutViewsCountLabel()
    }
    
    private func layoutChatCountLabel() {
        NSLayoutConstraint.activate([
            chatCountLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            chatCountLabel.topAnchor.constraint(equalTo: self.topAnchor)
        ])
    }
    
    private func layoutFavoriteCountLabel() {
        NSLayoutConstraint.activate([
            favoriteCountLabel.leadingAnchor.constraint(equalTo: chatCountLabel.trailingAnchor, constant: 8),
            favoriteCountLabel.topAnchor.constraint(equalTo: chatCountLabel.topAnchor)
        ])
    }
    
    private func layoutViewsCountLabel() {
        NSLayoutConstraint.activate([
            viewsCountLabel.leadingAnchor.constraint(equalTo: favoriteCountLabel.trailingAnchor, constant: 8),
            viewsCountLabel.topAnchor.constraint(equalTo: chatCountLabel.topAnchor)
        ])
    }
}
