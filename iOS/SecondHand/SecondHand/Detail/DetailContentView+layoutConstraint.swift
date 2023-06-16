//
//  DetailContentView+layoutConstraint.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

extension DetailConetntView {
    func addSubviews() {
        let subViews = [
            productImageView,
            pageControl,
            sellerInfo,
            statusButton,
            productNameLabel,
            categoryLabel,
            uploadTimeLabel,
            descriptionLabel,
            chatLabel,
            chatCountLabel,
            favoriteLabel,
            favoriteCountLabel,
            viewsLabel,
            viewsCountLabel,
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    func layoutConstraint() {
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            productImageView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            productImageView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            productImageView.topAnchor.constraint(equalTo: self.topAnchor),
            productImageView.heightAnchor.constraint(equalTo: productImageView.widthAnchor,
                                                     multiplier: heightRatio),
            
            pageControl.leadingAnchor.constraint(equalTo: self.productImageView.leadingAnchor),
            pageControl.trailingAnchor.constraint(equalTo: self.productImageView.trailingAnchor),
            pageControl.bottomAnchor.constraint(equalTo: productImageView.bottomAnchor),
            pageControl.heightAnchor.constraint(equalToConstant: 20),
            
            sellerInfo.leadingAnchor.constraint(equalTo: productImageView.leadingAnchor, constant: 16),
            sellerInfo.trailingAnchor.constraint(equalTo: productImageView.trailingAnchor, constant: -16),
            sellerInfo.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            sellerInfo.heightAnchor.constraint(equalToConstant: 60)
        ])
        sellerInfo.layoutConstraint()
        
        NSLayoutConstraint.activate([
            statusButton.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            statusButton.topAnchor.constraint(equalTo: sellerInfo.bottomAnchor, constant: 16),
            
            productNameLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            productNameLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            productNameLabel.topAnchor.constraint(equalTo: statusButton.bottomAnchor, constant: 16),
            
            categoryLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            categoryLabel.topAnchor.constraint(equalTo: productNameLabel.bottomAnchor, constant: 8),
            
            uploadTimeLabel.leadingAnchor.constraint(equalTo: categoryLabel.trailingAnchor, constant: 8),
            uploadTimeLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            uploadTimeLabel.topAnchor.constraint(equalTo: productNameLabel.bottomAnchor, constant: 8),
            
            descriptionLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            descriptionLabel.trailingAnchor.constraint(equalTo: sellerInfo.trailingAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: categoryLabel.bottomAnchor, constant: 16),
            
            chatLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            chatLabel.topAnchor.constraint(equalTo: descriptionLabel.bottomAnchor, constant: 16),
            
            chatCountLabel.leadingAnchor.constraint(equalTo: chatLabel.trailingAnchor, constant: 4),
            chatCountLabel.topAnchor.constraint(equalTo: chatLabel.topAnchor),
            
            favoriteLabel.leadingAnchor.constraint(equalTo: chatCountLabel.trailingAnchor, constant: 8),
            favoriteLabel.topAnchor.constraint(equalTo: chatLabel.topAnchor),
            
            favoriteCountLabel.leadingAnchor.constraint(equalTo: favoriteLabel.trailingAnchor, constant: 4),
            favoriteCountLabel.topAnchor.constraint(equalTo: chatLabel.topAnchor),
            
            viewsLabel.leadingAnchor.constraint(equalTo: favoriteCountLabel.trailingAnchor, constant: 8),
            viewsLabel.topAnchor.constraint(equalTo: chatLabel.topAnchor),
            
            viewsCountLabel.leadingAnchor.constraint(equalTo: viewsLabel.trailingAnchor, constant: 4),
            viewsCountLabel.topAnchor.constraint(equalTo: chatLabel.topAnchor),
            viewsCountLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
        ])
    }
}
