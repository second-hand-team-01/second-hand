//
//  AccountInputView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/21.
//

import UIKit

class AccountInputView: UIView, UITextFieldDelegate {
    private var idLabel = UILabel()
    private var idInputTextField = UITextField()
    private var warningLabel: UILabel = {
        var label = UILabel()
        label.text = DefaultText.warningMessage
        label.textColor = .red
        label.font = .typo.footNote
        label.isHidden = true
        return label
    }()
    private var passwordLabel = UILabel()
    private var passwordInputTextField = UITextField()
    private var textfieldDelegate = AccountValidationDelegate()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setDeafultText()
        self.addSubviews()
        self.setDelegateToTextField()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setDeafultText()
        self.addSubviews()
        self.setDelegateToTextField()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.addConstraints()
    }
    
    private func setDeafultText() {
        self.idLabel.text = DefaultText.id
        self.idInputTextField.placeholder = DefaultText.idInput
        self.passwordLabel.text = DefaultText.password
        self.passwordInputTextField.placeholder = DefaultText.passwordInput
    }
    
    private func setDelegateToTextField() {
        self.idInputTextField.delegate = self.textfieldDelegate
        self.textfieldDelegate.isValidSender = { isValid in
            guard isValid else {
                self.warningLabel.isHidden = false
                return
            }
            self.warningLabel.isHidden = true
        }
    }
    
    // TODO: - 델리게이트를 이용해서 가져올 수 있을까? 생각해보자.
    func getEnteredId() -> String? {
        return self.idInputTextField.text
    }
    
    func getEnteredPassword() -> String? {
        return self.passwordInputTextField.text
    }
}

// MARK: - Constraint 설정
extension AccountInputView {
    private func addSubviews() {
        let subViews = [
            self.idLabel,
            self.idInputTextField,
            self.warningLabel,
            self.passwordLabel,
            self.passwordInputTextField
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func addConstraints() {
        self.addConstraintToIdViews()
        self.addConstraintToWarningLabel()
        self.addConstraintToPasswordViews()
    }

    private func addConstraintToIdViews() {
        NSLayoutConstraint.activate([
            self.idLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.idLabel.topAnchor.constraint(equalTo: self.topAnchor),

            self.idInputTextField.leadingAnchor.constraint(
                equalTo: self.idLabel.trailingAnchor,
                constant: 52.74
            ),
            self.idInputTextField.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            self.idInputTextField.centerYAnchor.constraint(equalTo: self.idLabel.centerYAnchor)
        ])
    }
    
    private func addConstraintToWarningLabel() {
        NSLayoutConstraint.activate([
            self.warningLabel.leadingAnchor.constraint(greaterThanOrEqualTo: self.leadingAnchor),
            self.warningLabel.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.warningLabel.topAnchor.constraint(
                equalTo: self.idInputTextField.bottomAnchor,
                constant: 5
            )
        ])
    }
    
    private func addConstraintToPasswordViews() {
        NSLayoutConstraint.activate([
            self.passwordLabel.leadingAnchor.constraint(equalTo: self.idLabel.leadingAnchor),
            self.passwordLabel.topAnchor.constraint(
                equalTo: self.warningLabel.bottomAnchor,
                constant: 10
            ),
            self.passwordLabel.bottomAnchor.constraint(equalTo: self.bottomAnchor),

            self.passwordInputTextField.leadingAnchor.constraint(equalTo: self.idInputTextField.leadingAnchor),
            self.passwordInputTextField.trailingAnchor.constraint(equalTo: self.idInputTextField.trailingAnchor),
            self.passwordInputTextField.centerYAnchor.constraint(equalTo: self.passwordLabel.centerYAnchor)
        ])
    }
}

// MARK: - Label에 필요한 text 문자열 Raw Value
extension AccountInputView {
    enum DefaultText {
        static let id = "아이디"
        static let idInput = "아이디를 입력하세요"
        static let password = "비밀번호"
        static let passwordInput = "비밀번호를 입력하세요"
        static let warningMessage = "아이디는 3~12 글자 혹은 영어 대/소문자나 숫자만 가능합니다."
    }
}
