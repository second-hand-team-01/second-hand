//
//  FormatPriceGenerator.swift
//  SecondHand
//
//  Created by Wood on 2023/07/22.
//

import Foundation

struct FormatPriceGenerator {
    static let numberFormatter: NumberFormatter = {
        let numberFormatter = NumberFormatter()
        numberFormatter.numberStyle = .decimal
        return numberFormatter
    }()
    
    private init() {}
    
    static func generate(from price: Int) -> String {
        guard let result = self.numberFormatter.string(from: NSNumber(value: price)) else {
            return "\(price)원"
        }

        return "\(result)원"
    }
}
