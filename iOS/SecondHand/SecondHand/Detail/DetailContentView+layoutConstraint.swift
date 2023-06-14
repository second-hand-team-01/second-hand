//
//  DetailContentView+layoutConstraint.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

extension DetailConetntView {
    func layoutConstraint() {
        self.addSubview(productImageView)
        productImageView.translatesAutoresizingMaskIntoConstraints = false
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            productImageView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            productImageView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            productImageView.topAnchor.constraint(equalTo: self.topAnchor),
            productImageView.heightAnchor.constraint(equalTo: productImageView.widthAnchor,
                                                     multiplier: heightRatio)
        ])
        
        self.addSubview(pageControl)
        pageControl.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            pageControl.leadingAnchor.constraint(equalTo: self.productImageView.leadingAnchor),
            pageControl.trailingAnchor.constraint(equalTo: self.productImageView.trailingAnchor),
            pageControl.bottomAnchor.constraint(equalTo: productImageView.bottomAnchor),
            pageControl.heightAnchor.constraint(equalToConstant: 20)
        ])
        
        self.addSubview(sellerInfo)
        sellerInfo.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            sellerInfo.leadingAnchor.constraint(equalTo: productImageView.leadingAnchor, constant: 16),
            sellerInfo.trailingAnchor.constraint(equalTo: productImageView.trailingAnchor, constant: -16),
            sellerInfo.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            sellerInfo.heightAnchor.constraint(equalToConstant: 60)
        ])
        sellerInfo.layoutConstraint()
        
        self.addSubview(statusButton)
        statusButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            statusButton.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            statusButton.topAnchor.constraint(equalTo: sellerInfo.bottomAnchor, constant: 16)
        ])
        
        self.addSubview(titleLabel)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            titleLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            titleLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            titleLabel.topAnchor.constraint(equalTo: statusButton.bottomAnchor, constant: 16)
        ])
        
        self.addSubview(categoryLabel)
        categoryLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            categoryLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            categoryLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8)
        ])
        
        self.addSubview(uploadTimeLabel)
        uploadTimeLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            uploadTimeLabel.leadingAnchor.constraint(equalTo: categoryLabel.trailingAnchor, constant: 8),
            uploadTimeLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            uploadTimeLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8)
        ])
        
        self.addSubview(descriptionLabel)
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            descriptionLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            descriptionLabel.trailingAnchor.constraint(equalTo: sellerInfo.trailingAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: categoryLabel.bottomAnchor, constant: 16)
        ])
    }
}
