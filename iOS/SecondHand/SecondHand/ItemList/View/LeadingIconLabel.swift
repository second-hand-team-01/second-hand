//
//  leadingIconLabel.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import UIKit

class LeadingIconLabel: UIView {
    var iconImageView = UIImageView()
    var textLabel = UILabel()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.configureLeadingIconLabel()
        self.layoutLeadingIconLabel()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func configureLeadingIconLabel() {
        [
            iconImageView,
            textLabel
        ].forEach {
            self.addSubview($0)
        }
    }
    
    private func layoutLeadingIconLabel() {
        iconImageView.translatesAutoresizingMaskIntoConstraints = false
        textLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            iconImageView.widthAnchor.constraint(equalToConstant: 24),
            iconImageView.heightAnchor.constraint(equalToConstant: 20)
        ])

        NSLayoutConstraint.activate([
            textLabel.leadingAnchor.constraint(equalTo: iconImageView.trailingAnchor),
            textLabel.centerYAnchor.constraint(equalTo: self.iconImageView.centerYAnchor)
        ])
    }
}
