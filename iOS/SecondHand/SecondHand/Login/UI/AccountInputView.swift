//
//  AccountInputView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/21.
//

import UIKit

class AccountInputView: UIView {
    private var idLabel = UILabel()
    private var idInputTextField = UITextField()
    private var passwordLabel = UILabel()
    private var passwordInputTextField = UITextField()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setDeafultText()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setDeafultText()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.layoutConstraints()
    }
    
    private func setDeafultText() {
        self.idLabel.text = DefaultText.id
        self.idInputTextField.textColor = ColorPalette.neutral.textWeak
        self.idInputTextField.placeholder = DefaultText.idInput
        self.passwordLabel.text = DefaultText.password
        self.passwordInputTextField.textColor = ColorPalette.neutral.textWeak
        self.passwordInputTextField.placeholder = DefaultText.passwordInput
    }
}

// MARK: - Constraint 설정
extension AccountInputView {
    private func addSubviews() {
        let subViews = [
            self.idLabel,
            self.idInputTextField,
            self.passwordLabel,
            self.passwordInputTextField
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutConstraints() {
        self.addSubviews()
        self.layoutIdViews()
        self.layoutPasswordViews()
    }

    private func layoutIdViews() {
        NSLayoutConstraint.activate([
            self.idLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.idLabel.topAnchor.constraint(equalTo: self.topAnchor),

            self.idInputTextField.leadingAnchor.constraint(equalTo: self.idLabel.trailingAnchor, constant: 52.74),
            self.idInputTextField.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            self.idInputTextField.centerYAnchor.constraint(equalTo: self.idLabel.centerYAnchor)
        ])
    }
    
    private func layoutPasswordViews() {
        NSLayoutConstraint.activate([
            self.passwordLabel.leadingAnchor.constraint(equalTo: self.idLabel.leadingAnchor),
            self.passwordLabel.topAnchor.constraint(equalTo: self.idLabel.bottomAnchor, constant: 30),
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
    }
}
