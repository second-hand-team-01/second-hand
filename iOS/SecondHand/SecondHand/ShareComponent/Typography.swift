//
//  Typography.swift
//  SecondHand
//
//  Created by Wood on 2023/06/15.
//

import UIKit

enum Typography {
    static let largeTitle = UIFont.systemFont(ofSize: FontSize.largeTitle, weight: .regular)
    static let title1 = UIFont.systemFont(ofSize: FontSize.title1, weight: .regular)
    static let title2 = UIFont.systemFont(ofSize: FontSize.title2, weight: .regular)
    static let title3 = UIFont.systemFont(ofSize: FontSize.title3, weight: .regular)
    static let headLine = UIFont.systemFont(ofSize: FontSize.headLine, weight: .semibold)
    static let body = UIFont.systemFont(ofSize: FontSize.body, weight: .regular)
    static let callOut = UIFont.systemFont(ofSize: FontSize.callOut, weight: .regular)
    static let subHead = UIFont.systemFont(ofSize: FontSize.subHead, weight: .regular)
    static let footNote = UIFont.systemFont(ofSize: FontSize.footNote, weight: .regular)
    static let caption1 = UIFont.systemFont(ofSize: FontSize.caption1, weight: .regular)
    static let caption2 = UIFont.systemFont(ofSize: FontSize.caption2, weight: .regular)

    enum FontSize {
        static let largeTitle: CGFloat = 34
        static let title1: CGFloat = 28
        static let title2: CGFloat = 22
        static let title3: CGFloat = 22
        static let headLine: CGFloat = 20
        static let body: CGFloat = 17
        static let callOut: CGFloat = 16
        static let subHead: CGFloat = 15
        static let footNote: CGFloat = 13
        static let caption1: CGFloat = 12
        static let caption2: CGFloat = 11
    }
}
