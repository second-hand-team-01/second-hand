//
//  titleLabel.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import UIKit

class TitleLabel: UILabel {

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.configureLabel()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func configureLabel() {
        self.textAlignment = .left
        self.font = .systemFont(ofSize: 15, weight: .regular)
    }
    
    func updateText(to title: String) {
        self.text = title
    }
}
