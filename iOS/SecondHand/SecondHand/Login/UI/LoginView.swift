//
//  LoginView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/26.
//

import UIKit

class LoginView: UIView {
    private var accountInputView = AccountInputView(frame: CGRect.zero)
    private var gitHubSignInButton = UIButton()
    private var signInButton = UIButton()
    private var signUpButton = UIButton()
    var buttonTagSender: ((Int) -> ())?

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setButtons()
        self.setControlToSignInButton()
        self.addSubviews()
        self.addConstraints()
    }
    
    private func addSubviews() {
        let subViews = [
            self.accountInputView,
            self.gitHubSignInButton,
            self.signInButton,
            self.signUpButton
        ]

        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview($0)
        }
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setButtons()
        self.setControlToSignInButton()
        self.addSubviews()
        self.addConstraints()
    }
    
    private func setButtons() {
        typealias Factory = AccountButtonUIFactory

        self.gitHubSignInButton = setAction(
            to: Factory.make(type: .github)
        )
        self.signInButton = setAction(
            to: Factory.make(type: .login)
        )
        self.signUpButton = setAction(
            to: Factory.make(type: .register)
        )
    }
    
    private func setAction(to button: UIButton) -> UIButton {
        let button = button
        let action = UIAction { _ in
            self.buttonTagSender?(button.tag)
            return
        }
        button.addAction(action, for: .touchUpInside)
        return button
    }
    
//    override func layoutSubviews() {
//        super.layoutSubviews()
//        self.addSubviews()
//        self.addConstraints()
//    }
    
    private func addConstraints() {
        self.addConstraintToAccountInputView()
        self.addConstraintToGitHubSignInButton()
        self.addConstraintToSignInButton()
        self.addConstraintToSignUpButton()
    }
    
    func getEnteredInfo() -> (String?, String?) {
        return (self.accountInputView.getEnteredId(), self.accountInputView.getEnteredPassword())
    }
    
    // TODO: - Naming - ID 입력 분기처리에 따라 로그인 버튼 On/Off 메소드
    private func setControlToSignInButton() {
        self.accountInputView.isSignInEnabledSender = { isEnable in
            guard isEnable else {
                self.signInButton.isUserInteractionEnabled = false
                self.signInButton.backgroundColor = .lightGray
                return
            }
            self.signInButton.isUserInteractionEnabled = true
            self.signInButton.backgroundColor = .orange
        }
    }
}

// MARK: - 하위뷰 Constraint 부여
extension LoginView {
    private func addConstraintToAccountInputView() {
        NSLayoutConstraint.activate([
            self.accountInputView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.accountInputView.trailingAnchor.constraint(
                equalTo: self.trailingAnchor),
            self.accountInputView.topAnchor.constraint(equalTo: self.topAnchor
            )
        ])
    }

    private func addConstraintToGitHubSignInButton() {
        NSLayoutConstraint.activate([
            self.gitHubSignInButton.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.gitHubSignInButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.gitHubSignInButton.topAnchor.constraint(
                equalTo: self.accountInputView.bottomAnchor,
                constant: Constant.Button.gitHubSignInTop
            ),
        ])
    }
    
    private func addConstraintToSignInButton() {
        NSLayoutConstraint.activate([
            self.signInButton.leadingAnchor.constraint(
                equalTo: self.leadingAnchor),
            self.signInButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.signInButton.topAnchor.constraint(
                equalTo: self.gitHubSignInButton.bottomAnchor,
                constant: Constant.Button.spacing
            ),
        ])
    }
    
    private func addConstraintToSignUpButton() {
        NSLayoutConstraint.activate([
            self.signUpButton.leadingAnchor.constraint(
                equalTo: self.leadingAnchor),
            self.signUpButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.signUpButton.topAnchor.constraint(
                equalTo: self.signInButton.bottomAnchor,
                constant: Constant.Button.spacing
            ),
            self.signUpButton.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}

extension LoginView {
    enum Constant {
        struct Button {
            static let gitHubSignInTop: CGFloat = 200
            static let spacing: CGFloat = 10
        }
    }
}
