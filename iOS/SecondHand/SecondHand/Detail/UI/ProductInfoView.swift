//
//  ProductInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/19.
//

import UIKit

class ProductInfoView: UIView {
    private var nameLabel = UILabel()
    private var annotationLabel = UILabel()
    private var descriptionLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setFont()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.layoutConstraints()
    }
    
    func update(by productInfo: DetailModel.ProductInfo) {
        self.nameLabel.text = "\(productInfo.title)"
        self.annotationLabel.text = "\(productInfo.category) ・ \(productInfo.postedTime)"
        self.descriptionLabel.text = "\(productInfo.description)"
    }
    
    private func setFont() {
        self.nameLabel.font = .typo.headLine
        self.annotationLabel.font = .typo.footNote
        self.annotationLabel.textColor = ColorPalette.neutral.textWeak
        self.descriptionLabel.font = .typo.body
    }
}

// MARK: - Constraint 설정
extension ProductInfoView {
    private func addSubviews() {
        let subViews = [
            nameLabel,
            annotationLabel,
            descriptionLabel,
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutConstraints() {
        self.addSubviews()
        self.layoutNameLabel()
        self.layoutAnnotationLabel()
        self.layoutDescriptionLabel()
    }
    
    private func layoutNameLabel() {
        NSLayoutConstraint.activate([
            nameLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            nameLabel.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            nameLabel.topAnchor.constraint(equalTo: self.topAnchor)
        ])
    }
    
    private func layoutAnnotationLabel() {
        NSLayoutConstraint.activate([
            annotationLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            annotationLabel.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            annotationLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 8)
        ])
    }
    
    private func layoutDescriptionLabel() {
        NSLayoutConstraint.activate([
            descriptionLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            descriptionLabel.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: annotationLabel.bottomAnchor, constant: 16)
        ])
    }
}
