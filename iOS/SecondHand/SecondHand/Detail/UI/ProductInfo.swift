//
//  ProductInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/19.
//

import UIKit

class ProductInfo: UIView {
    private var nameLabel = UILabel()
    private var annotationLabel = UILabel()
    private var descriptionLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        return label
    }()
    private var communicationInfo = CommunicationInfo(frame: .zero)

    override init(frame: CGRect) {
        super.init(frame: frame)
        setFont()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layoutConstraints()
    }
    
    func configure(name: String,
                   annotation: String,
                   description: String
    ) {
        self.nameLabel.text = "\(name)"
        self.annotationLabel.text = "\(annotation)"
        self.descriptionLabel.text = "\(description)"
    }
    
    private func setFont() {
        self.nameLabel.font = .typo.headLine
        self.annotationLabel.font = .typo.footNote
        self.annotationLabel.textColor = ColorPalette.neutral.textWeak
        self.descriptionLabel.font = .typo.body
    }
}

// MARK: - Constraint 설정
extension ProductInfo {
    private func addSubviews() {
        let subViews = [
            nameLabel,
            annotationLabel,
            descriptionLabel,
            communicationInfo
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutConstraints() {
        addSubviews()
        layoutNameLabel()
        layoutAnnotationLabel()
        layoutDescriptionLabel()
        layoutCommunicationLabel()
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
    
    func layoutCommunicationLabel() {
        NSLayoutConstraint.activate([
            communicationInfo.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            communicationInfo.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            communicationInfo.topAnchor.constraint(equalTo: descriptionLabel.bottomAnchor, constant: 16),
            communicationInfo.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}
