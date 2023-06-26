//
//  LoginView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/26.
//

import UIKit

class LoginView: UIView {
    private var accountInputView = AccountInputView(frame: CGRect.zero)
    private var loginButtonGroupView = LoginButtonGroupView(frame: CGRect.zero)

    override func layoutSubviews() {
        super.layoutSubviews()
        self.addConstraints()
    }

    private func addConstraints() {
        addSubviews()
        addConstraintToAccountInputView()
        addConstraintToLoginButtonGroupView()
    }
    
    func getEnteredInfo() -> (String?, String?) {
        return (accountInputView.getEnteredId(), accountInputView.getEnteredPassword())
    }
}

// MARK: - 하위뷰 Constraint 부여
extension LoginView {
    private func addSubviews() {
        let subViews = [
            self.accountInputView,
            self.loginButtonGroupView
        ]

        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview($0)
        }
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

    private func addConstraintToLoginButtonGroupView() {
        NSLayoutConstraint.activate([
            self.loginButtonGroupView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.loginButtonGroupView.trailingAnchor.constraint(
                equalTo: self.trailingAnchor),
            self.loginButtonGroupView.topAnchor.constraint(
                equalTo: self.accountInputView.bottomAnchor,
                constant: 200
            ),
            self.loginButtonGroupView.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}
