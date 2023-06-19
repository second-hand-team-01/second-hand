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
            productInfo
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    func layoutConstraint() {
        addSubviews()
        
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
        
        NSLayoutConstraint.activate([
            statusButton.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            statusButton.topAnchor.constraint(equalTo: sellerInfo.bottomAnchor, constant: 16),
            
            productInfo.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            productInfo.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            productInfo.topAnchor.constraint(equalTo: statusButton.bottomAnchor, constant: 16),
            productInfo.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}
