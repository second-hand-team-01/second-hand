//
//  ColorPalette.swift
//  SecondHand
//
//  Created by apple on 2023/06/16.
//

import UIKit

enum ColorValue {
    static let white = UIColor(named: "white")
    static let gray50 = UIColor(named: "gray50")
    static let gray100 = UIColor(named: "gray100")
    static let gray200 = UIColor(named: "gray200")
    static let gray300 = UIColor(named: "gray300")
    static let gray400 = UIColor(named: "gray400")
    static let gray500 = UIColor(named: "gray500")
    static let gray600 = UIColor(named: "gray600")
    static let gray700 = UIColor(named: "gray700")
    static let gray800 = UIColor(named: "gray800")
    static let gray900 = UIColor(named: "gray900")
    static let black = UIColor(named: "black")
    static let mint = UIColor(named: "mint")
    static let orange = UIColor(named: "oarnge")
    static let blue = UIColor(named: "blue")
    static let red = UIColor(named: "red")
}

enum NeutralPalette {
    static let text = ColorValue.gray900
    static let textWeak = ColorValue.gray800
    static let textStrong = ColorValue.black
    static let background = ColorValue.white
    static let backgroundWeak = ColorValue.gray50
    static let backgroundBold = ColorValue.gray400
    static let backgroundBulr = ColorValue.gray100
    static let border = ColorValue.gray500
    static let borderStrong = ColorValue.gray700
    static let overay = ColorValue.gray600
}

enum AccentPalette {
    static let text = ColorValue.white
    static let textWeak = ColorValue.black
    static let backgroundPrimary = ColorValue.orange
    static let backgroundSecondary = ColorValue.mint
}

enum SystemPalette {
    static let defaultBlue = ColorValue.blue
    static let warming = ColorValue.red
    static let background = ColorValue.white
    static let backgroundWeak = ColorValue.gray200
}

enum ColorPalette {
    static let neutral = NeutralPalette.self
    static let accent = AccentPalette.self
    static let system = SystemPalette.self
}
