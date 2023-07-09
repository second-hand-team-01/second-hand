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

    func isUserTypingDelete(length: Int) -> Bool {
        guard length == 0 else {
            return false
        }
        
        return true
    }
    
    func validateLength(location: Int) -> Bool {
        guard inputLimitRange.contains(location) else {
            return false
        }

        return true
    }
    
    func validateId(
        by text: String,
        with location: Int
    ) -> Bool {
        guard text.range(of: regexPattern, options: .regularExpression) == nil else {
            return false
        }
        
        return true
    }
    
    /// 입력 ID 검증
    func textField(
        _ textField: UITextField,
        shouldChangeCharactersIn range: NSRange,
        replacementString string: String)
    -> Bool {
        var location = range.location + 1
        var text = (textField.text ?? "") + string
        
        if !isUserTypingDelete(length: range.length) {
            location -= 1
            text = String(text.dropLast(1))
        }
        
        guard validateLength(location: location) else {
            isValidSender?(false)
            return true
        }
        
        guard validateId(by: text, with: location) else {
            isValidSender?(false)
            return true
        }
        
        isValidSender?(true)
        return true
    }
    
    /// Return 버튼 클릭시 키보드 내려감
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
