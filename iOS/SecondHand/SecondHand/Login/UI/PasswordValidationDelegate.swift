//
//  PasswordValidationDelegate.swift
//  SecondHand
//
//  Created by Wood on 2023/07/14.
//

import UIKit

final class PasswordValidationDelegate: NSObject, UITextFieldDelegate {
    private let inputLimitRange: ClosedRange = (6...12)
    var isValidSender: ((Bool) -> ())?
    
    private func isUserTypingDelete(length: Int) -> Bool {
        guard length == 0 else {
            return false
        }
        
        return true
    }
    
    private func validateLength(location: Int) -> Bool {
        guard inputLimitRange.contains(location) else {
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
        
        if !self.isUserTypingDelete(length: range.length) {
            location -= 1
            text = String(text.dropLast(1))
        }
        
        guard self.validateLength(location: location) else {
            self.isValidSender?(false)
            return true
        }
        
        self.isValidSender?(true)
        return true
    }
    
    /// Return 버튼 클릭시 키보드 내려감
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
