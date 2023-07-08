//
//  AccountValidationDelegate.swift
//  SecondHand
//
//  Created by Wood on 2023/07/02.
//

import UIKit
import RegexBuilder

class AccountValidationDelegate: NSObject, UITextFieldDelegate {
    private let inputLimitRange: ClosedRange = (3...12)
    private let regexPattern: String = "[^A-Z|a-z|0-9]"
    var isValidSender: ((Bool) -> ())?

    // TODO: - 가독성을 고려하여 깔끔하게 짜기!!
    func textField(
        _ textField: UITextField,
        shouldChangeCharactersIn range: NSRange,
        replacementString string: String)
    -> Bool {
        // 사용자가 입력할 때
        if range.length == 0 {
            if !inputLimitRange.contains(range.location + 1) {
                isValidSender?(false)
                return true
            }
            
            if let originText = textField.text {
                if (originText + string).range(of: regexPattern, options: .regularExpression) != nil {
                    isValidSender?(false)
                    return true
                }
            }
        // 사용자가 삭제할 때
        } else {
            if !inputLimitRange.contains(range.location) {
                isValidSender?(false)
                return true
            }
            
            if let text = textField.text?.prefix(range.location) {
                if String(text).range(of: regexPattern, options: .regularExpression) != nil {
                    isValidSender?(false)
                    return true
                }
            }
        }
        
        isValidSender?(true)
        return true
    }
}
