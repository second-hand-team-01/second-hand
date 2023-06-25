//
//  LoginButtonGroupView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/22.
//

import UIKit

class LoginButtonGroupView: UIView {
    private var githubLoginButton = UIButton()
    private var loginButton = UIButton()
    private var registerButton = UIButton()
    private let spacingBetweenButton: CGFloat = 10
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setButtons()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setButtons()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.layoutConstraints()
    }
    
    private func setButtons() {
        typealias Factory = AccountButtonUIFactory
        
        self.githubLoginButton = addAction(
            to: Factory.make(type: .github)
        )
        self.loginButton = addAction(
            to: Factory.make(type: .login)
        )
        self.registerButton = addAction(
            to: Factory.make(type: .register)
        )
    }
    
    private func layoutConstraints() {
        self.addSubviews()
        self.layoutGithubButton()
        self.layoutLoginButton()
        self.layoutRegisterButton()
    }
}

// MARK: - Constraint 설정 메소드
extension LoginButtonGroupView {
    private func addSubviews() {
        let subViews = [
            self.githubLoginButton,
            self.loginButton,
            self.registerButton
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutGithubButton() {
        NSLayoutConstraint.activate([
            self.githubLoginButton.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.githubLoginButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.githubLoginButton.topAnchor.constraint(equalTo: self.topAnchor)
        ])
    }
    
    private func layoutLoginButton() {
        NSLayoutConstraint.activate([
            self.loginButton.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.loginButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.loginButton.topAnchor.constraint(
                equalTo: self.githubLoginButton.bottomAnchor,
                constant: spacingBetweenButton
            )
        ])
    }
    
    private func layoutRegisterButton() {
        NSLayoutConstraint.activate([
            self.registerButton.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.registerButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.registerButton.topAnchor.constraint(
                equalTo: self.loginButton.bottomAnchor,
                constant: spacingBetweenButton
            ),
            self.registerButton.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}
