//
//  SellerInfo.swift
//  SecondHand
//
//  Created by Wood on 2023/06/12.
//

import UIKit

class SellerInfo: UIView {
    var label = UILabel()
    var name = UILabel()

    override func layoutSubviews() {
        super.layoutSubviews()
        layoutConstraint()
    }
    
    func configure(name: String) {
        self.label.text = "판매자 정보"
        self.name.lineBreakMode = .byCharWrapping
        self.name.text = nameg
    }
    
    private func layoutConstraint() {
        self.addSubview(label)
        label.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            label.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
            label.centerYAnchor.constraint(equalTo: self.centerYAnchor)
        ])
        label.setContentCompressionResistancePriority(UILayoutPriority(751), for: .horizontal)
        
        self.addSubview(name)
        name.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            name.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16),
            name.centerYAnchor.constraint(equalTo: self.centerYAnchor),
            name.leadingAnchor.constraint(greaterThanOrEqualTo: label.trailingAnchor, constant: 16)
        ])
    }

    func configure(name: String) {
        self.label.text = "판매자 정보"
        self.name.lineBreakMode = .byCharWrapping
        self.name.text = name
    }
}
