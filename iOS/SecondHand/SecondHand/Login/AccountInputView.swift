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
        setDeafultText()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layoutConstraints()
    }
    
    private func setDeafultText() {
        self.idLabel.text = DefaultText.id
        self.idInputTextField.textColor = ColorPalette.neutral.textWeak
        self.idInputTextField.text = DefaultText.idInput
        self.passwordLabel.text = DefaultText.password
        self.passwordInputTextField.textColor = ColorPalette.neutral.textWeak
        self.passwordInputTextField.text = DefaultText.passwordInput
    }
}

// MARK: - Constraint 설정
extension AccountInputView {
    private func addSubviews() {
        let subViews = [
            idLabel,
            idInputTextField,
            passwordLabel,
            passwordInputTextField
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutConstraints() {
        addSubviews()
        layoutIdViews()
        layoutPasswordViews()
    }

    private func layoutIdViews() {
        NSLayoutConstraint.activate([
            idLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            idLabel.topAnchor.constraint(equalTo: self.topAnchor),
            
            idInputTextField.leadingAnchor.constraint(equalTo: idLabel.trailingAnchor, constant: 52.74),
            idInputTextField.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            idInputTextField.topAnchor.constraint(equalTo: idLabel.topAnchor)
        ])
    }
    
    private func layoutPasswordViews() {
        NSLayoutConstraint.activate([
            passwordLabel.leadingAnchor.constraint(equalTo: idLabel.leadingAnchor),
            passwordLabel.topAnchor.constraint(equalTo: idLabel.bottomAnchor, constant: 40),
            
            passwordInputTextField.leadingAnchor.constraint(equalTo: idInputTextField.leadingAnchor),
            passwordInputTextField.trailingAnchor.constraint(equalTo: idInputTextField.trailingAnchor),
            passwordInputTextField.topAnchor.constraint(equalTo: passwordLabel.topAnchor)
        ])
    }
}

extension AccountInputView {
    enum DefaultText {
        static let id = "아이디"
        static let idInput = "아이디를 입력하세요"
        static let password = "비밀번호"
        static let passwordInput = "비밀번호를 입력하세요"
    }
}
