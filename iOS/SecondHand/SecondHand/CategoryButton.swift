//
//  CategoryButton.swift
//  SecondHand
//
//  Created by Wood on 2023/08/19.
//

import UIKit

struct CategoryButtonFactory {
    static func make() -> UIButton {
        let button = UIButton(configuration: UIButton.Configuration.plain())
        button.tintColor = .black
        
        button.layer.borderColor = UIColor.gray.cgColor
        button.layer.borderWidth = 0.3
        button.layer.cornerRadius = 15
        
        return button
    }
}
