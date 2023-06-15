//
//  PriceLabel.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import UIKit

class PriceLabel: UILabel {
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
