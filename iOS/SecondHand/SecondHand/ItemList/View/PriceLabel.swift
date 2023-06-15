//
//  PriceLabel.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import UIKit

class PriceLabel: UILabel {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.configureLabel()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func configureLabel() {
        self.textAlignment = .left
        self.font = .systemFont(ofSize: 17, weight: .semibold)
    }
    
    func updateText(to price: Int) {
        let decimalFormatter = NumberFormatter()
        decimalFormatter.numberStyle = .decimal
        
        if let decimalPrice = decimalFormatter.string(from: NSNumber(value: price)) {
            self.text = "\(decimalPrice)원"
        } else {
            self.text = "\(price)원"
        }

    }
}
