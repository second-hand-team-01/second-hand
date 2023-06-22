//
//  LoginViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//

import UIKit

class LoginViewController: UIViewController {
    private var accountInputView = AccountInputView()
    private var githubLoginButton = UIButton()
    private var loginButton = UIButton()
    private var joinButton = UIButton()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setTitle(title: "내 계정")
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.layoutCosntraints()
    }
    
    private func setTitle(title: String) {
        self.navigationController?.title = "\(title)"
    }
}

extension LoginViewController {
    private func layoutCosntraints() {
        self.addSubviews()
        self.layoutAccountInputView()
    }
    
    private func addSubviews() {
        let subViews = [
            self.accountInputView
        ]
        
        subViews.forEach {
            self.view.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutAccountInputView() {
        NSLayoutConstraint.activate([
            self.accountInputView.leadingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: 16
            ),
            self.accountInputView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -16
            ),
            self.accountInputView.topAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.topAnchor,
                constant: 80
            ),
            self.accountInputView.heightAnchor.constraint(equalToConstant: 140)
        ])
    }
}
