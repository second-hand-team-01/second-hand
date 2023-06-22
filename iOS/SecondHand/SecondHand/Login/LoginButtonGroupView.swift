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
        self.githubLoginButton = makeGithubLoginButton()
        self.loginButton = makeLoginButton()
        self.registerButton = makeRegisterButton()
    }
    
    private func layoutConstraints() {
        self.addSubviews()
        self.layoutGithubButton()
    }
}

// MARK: - Constraint 설정 메소드
extension LoginButtonGroupView {
    private func addSubviews() {
        let subViews = [
            self.githubLoginButton
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
            self.githubLoginButton.topAnchor.constraint(equalTo: self.topAnchor),
            self.githubLoginButton.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}
