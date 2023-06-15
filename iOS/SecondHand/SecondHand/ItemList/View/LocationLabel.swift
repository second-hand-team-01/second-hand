//
//  LocationLabel.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import UIKit

class LocationLabel: UILabel {

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.configureLabel()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func configureLabel() {
        self.textAlignment = .left
        self.font = .systemFont(ofSize: 13, weight: .regular)
        self.textColor = .gray
    }
    
    func updateText(to location: String) {
        self.text = location
    }
}
