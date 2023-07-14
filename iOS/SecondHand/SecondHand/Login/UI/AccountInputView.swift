//
//  AccountInputView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/21.
//

import UIKit

class AccountInputView: UIView {
    private var idLabel = UILabel()
    private var idInputTextField: UITextField = {
        var textfield = UITextField()
        textfield.autocapitalizationType = .none
        textfield.clearButtonMode = .whileEditing
        return textfield
    }()
    private var idWarningLabel: UILabel = {
        var label = UILabel()
        label.text = DefaultText.idWarningMessage
        label.textColor = .red
        label.font = .typo.footNote
        label.isHidden = true
        return label
    }()
    private var passwordLabel = UILabel()
    private var passwordInputTextField: UITextField = {
        var textfield = UITextField()
        textfield.autocapitalizationType = .none
        textfield.clearButtonMode = .whileEditing
        textfield.isSecureTextEntry = true
        return textfield
    }()
    private var passwordWarningLabel: UILabel = {
        var label = UILabel()
        label.text = DefaultText.passwordWarningMessage
        label.textColor = .red
        label.font = .typo.footNote
        label.isHidden = true
        return label
    }()
    
    private var idValidator = IdValidationDelegate()
    private var passwordValidator = PasswordValidationDelegate()
    var isSignInEnabledSender: ((Bool) -> ())?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubviews()
        self.addConstraints()
        self.setDeafultText()
        self.setDelegateToIdInputTextField()
        self.setDelegateToPasswordInputTextField()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.addSubviews()
        self.addConstraints()
        self.setDeafultText()
        self.setDelegateToIdInputTextField()
        self.setDelegateToPasswordInputTextField()
    }
    
    private func setDeafultText() {
        self.idLabel.text = DefaultText.id
        self.idInputTextField.placeholder = DefaultText.idInput
        self.passwordLabel.text = DefaultText.password
        self.passwordInputTextField.placeholder = DefaultText.passwordInput
    }
    
    private func setDelegateToIdInputTextField() {
        self.idInputTextField.delegate = self.idValidator
        self.idValidator.isValidSender = { isValid in
            guard isValid else {
                self.idWarningLabel.isHidden = false
                self.isSignInEnabledSender?(false)
                return
            }
            self.isSignInEnabledSender?(true)
            self.idWarningLabel.isHidden = true
        }
    }
    
    private func setDelegateToPasswordInputTextField() {
        self.passwordInputTextField.delegate = self.passwordValidator
        self.passwordValidator.isValidSender = { isValid in
            guard isValid else {
                self.passwordWarningLabel.isHidden = false
                self.isSignInEnabledSender?(false)
                return
            }
            self.passwordWarningLabel.isHidden = true
            self.isSignInEnabledSender?(true)
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
            self.idWarningLabel,
            self.passwordLabel,
            self.passwordInputTextField,
            self.passwordWarningLabel
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func addConstraints() {
        self.addConstraintToIdViews()
        self.addConstraintToIdWarningLabel()
        self.addConstraintToPasswordViews()
        self.addConstraintToPasswordWarningLabel()
    }

    private func addConstraintToIdViews() {
        NSLayoutConstraint.activate([
            self.idLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.idLabel.topAnchor.constraint(equalTo: self.topAnchor),

            self.idInputTextField.leadingAnchor.constraint(
                equalTo: self.idLabel.trailingAnchor,
                constant: 40
            ),
            self.idInputTextField.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            self.idInputTextField.centerYAnchor.constraint(equalTo: self.idLabel.centerYAnchor)
        ])
    }
    
    private func addConstraintToIdWarningLabel() {
        NSLayoutConstraint.activate([
            self.idWarningLabel.leadingAnchor.constraint(greaterThanOrEqualTo: self.leadingAnchor),
            self.idWarningLabel.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.idWarningLabel.topAnchor.constraint(
                equalTo: self.idInputTextField.bottomAnchor,
                constant: 5
            )
        ])
    }
    
    private func addConstraintToPasswordViews() {
        NSLayoutConstraint.activate([
            self.passwordLabel.leadingAnchor.constraint(equalTo: self.idLabel.leadingAnchor),
            self.passwordLabel.topAnchor.constraint(
                equalTo: self.idWarningLabel.bottomAnchor,
                constant: 10
            ),

            self.passwordInputTextField.leadingAnchor.constraint(equalTo: self.idInputTextField.leadingAnchor),
            self.passwordInputTextField.trailingAnchor.constraint(equalTo: self.idInputTextField.trailingAnchor),
            self.passwordInputTextField.centerYAnchor.constraint(equalTo: self.passwordLabel.centerYAnchor)
        ])
    }
    
    private func addConstraintToPasswordWarningLabel() {
        NSLayoutConstraint.activate([
            self.passwordWarningLabel.leadingAnchor.constraint(greaterThanOrEqualTo: self.leadingAnchor),
            self.passwordWarningLabel.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.passwordWarningLabel.topAnchor.constraint(
                equalTo: self.passwordInputTextField.bottomAnchor,
                constant: 5
            ),
            self.passwordWarningLabel.bottomAnchor.constraint(equalTo: self.bottomAnchor)
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
        static let idWarningMessage = "아이디는 3~12 글자 혹은 영어 대/소문자나 숫자만 가능합니다."
        static let passwordWarningMessage = "비밀번호는 6~12 글자이어야 합니다."
    }
}
