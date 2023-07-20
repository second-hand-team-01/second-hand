//
//  CommunicationInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/19.
//

import UIKit

class CommunicationInfoView: UIView {
    private var chatCountLabel = UILabel()
    private var favoriteCountLabel = UILabel()
    private var viewsCountLabel = UILabel()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubviews()
        self.setFont()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.addConstraints()
    }
    
    func update(by userInteractionCount: DetailModel.UserInteractionCount) {
        self.chatCountLabel.text = "채팅 \(userInteractionCount.chat)"
        self.favoriteCountLabel.text = "관심 \(userInteractionCount.favorite)"
        self.viewsCountLabel.text = "조회 \(userInteractionCount.view)"
    }
    
    private func addSubviews() {
        let subViews = [
            self.chatCountLabel,
            self.favoriteCountLabel,
            self.viewsCountLabel
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func setFont() {
        let labels = [
            self.chatCountLabel,
            self.favoriteCountLabel,
            self.viewsCountLabel
        ]
        
        labels.forEach {
            $0.font = .typo.footNote
            $0.textColor = ColorPalette.neutral.textWeak
        }
    }
    
    private func addConstraints() {
        self.addConstraintsToChatCountLabel()
        self.addConstraintsToFavoriteCountLabel()
        self.addConstraintsToViewsCountLabel()
    }
}

// MARK: - Constraint 설정
extension CommunicationInfoView {
    private func addConstraintsToChatCountLabel() {
        NSLayoutConstraint.activate([
            self.chatCountLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.chatCountLabel.topAnchor.constraint(equalTo: self.topAnchor)
        ])
    }
    
    private func addConstraintsToFavoriteCountLabel() {
        NSLayoutConstraint.activate([
            self.favoriteCountLabel.leadingAnchor.constraint(equalTo: self.chatCountLabel.trailingAnchor, constant: 8),
            self.favoriteCountLabel.topAnchor.constraint(equalTo: chatCountLabel.topAnchor)
        ])
    }
    
    private func addConstraintsToViewsCountLabel() {
        NSLayoutConstraint.activate([
            self.viewsCountLabel.leadingAnchor.constraint(equalTo: self.favoriteCountLabel.trailingAnchor, constant: 8),
            self.viewsCountLabel.topAnchor.constraint(equalTo: chatCountLabel.topAnchor)
        ])
    }
}
