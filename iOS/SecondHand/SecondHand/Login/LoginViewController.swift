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
        setTitle(title: "내 계정")
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        layoutCosntraints()
    }
    
    private func setTitle(title: String) {
        self.navigationController?.title = "\(title)"
    }
}

extension LoginViewController {
    private func layoutCosntraints() {
        addSubviews()
        layoutAccountInputView()
    }
    
    private func addSubviews() {
        let subViews = [
            accountInputView
        ]
        
        subViews.forEach {
            self.view.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutAccountInputView() {
        NSLayoutConstraint.activate([
            accountInputView.leadingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: 16
            ),
            accountInputView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -16
            ),
            accountInputView.topAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.topAnchor,
                constant: 80
            ),
            accountInputView.heightAnchor.constraint(equalToConstant: 140)
        ])
    }
}

