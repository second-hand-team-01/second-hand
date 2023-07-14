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
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setButtons()
        self.setControlToSignInButton()
        self.addSubviews()
        self.addConstraints()
    }
    
    func clearTextFields() {
        self.accountInputView.clearText()
    }
    
    /// 깃헙 로그인 / 서버 로그인 / 회원가입 버튼 생성
    private func setButtons() {
        typealias Factory = AccountButtonUIFactory
        
        self.gitHubSignInButton = Factory.make(type: .github)
        self.addActionToGitHubSignInButton()
        
        self.signInButton = Factory.make(type: .login)
        self.addActionToSignInButton()
        
        self.signUpButton = Factory.make(type: .register)
        self.addActionToSignUpButton()
    }
    
    private func addActionToGitHubSignInButton() {
        let action = UIAction { _ in
            self.buttonTagSender?(self.gitHubSignInButton.tag)
            return
        }
        self.gitHubSignInButton.addAction(
            action,
            for: .touchUpInside
        )
    }
    
    private func addActionToSignInButton() {
        let action = UIAction { _ in
            self.buttonTagSender?(self.signInButton.tag)
            return
        }
        self.signInButton.addAction(
            action,
            for: .touchUpInside
        )
    }
    
    private func addActionToSignUpButton() {
        let action = UIAction { _ in
            self.buttonTagSender?(self.signUpButton.tag)
            return
        }
        self.signUpButton.addAction(
            action,
            for: .touchUpInside
        )
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
    
    /// 오토 레이아웃 설정
    private func addConstraints() {
        self.addConstraintToAccountInputView()
        self.addConstraintToGitHubSignInButton()
        self.addConstraintToSignInButton()
        self.addConstraintToSignUpButton()
    }
    
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
    
    /// 입력 ID / PW를 ViewController에 전달하는 메소드
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
    
    /// TextField에 입력중 빈 공간 클릭시 키보드 내려가는 기능
    override func touchesEnded(
        _ touches: Set<UITouch>,
        with event: UIEvent?
    ) {
        self.endEditing(true)
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
