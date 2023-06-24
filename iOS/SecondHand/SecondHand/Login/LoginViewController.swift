//
//  LoginViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//
import UIKit

class LoginViewController: UIViewController {
    private var accountInputView = AccountInputView(frame: CGRect.zero)
    private var loginButtonGroupView = LoginButtonGroupView(frame: CGRect.zero)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setViewControllerTitle(to: "내 계정")
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.layoutCosntraints()
    }
    
    private func setViewControllerTitle(to title: String) {
        self.title = "\(title)"
    }
}

// MARK: - Constraint 설정 메소드 추가
extension LoginViewController {
    private func layoutCosntraints() {
        self.addSubviews()
        self.layoutAccountInputView()
        self.layoutLoginButtonGroupView()
    }
    
    private func addSubviews() {
        let subViews = [
            self.accountInputView,
            self.loginButtonGroupView
        ]
        
        subViews.forEach {
            self.view.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutAccountInputView() {
        guard let navigationBarBottomAnchor = self.navigationController?.navigationBar.bottomAnchor else {
            return
        }
        
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
                equalTo: navigationBarBottomAnchor,
                constant: 80
            )
        ])
    }
    
    private func layoutLoginButtonGroupView() {
        guard let tabBarTopAnchor = self.tabBarController?.tabBar.topAnchor else {
            return
        }
        
        NSLayoutConstraint.activate([
            self.loginButtonGroupView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: 16
            ),
            self.loginButtonGroupView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -16
            ),
            self.loginButtonGroupView.topAnchor.constraint(
                equalTo: self.accountInputView.bottomAnchor,
                constant: 200
            ),
            self.loginButtonGroupView.bottomAnchor.constraint(lessThanOrEqualTo: tabBarTopAnchor)
        ])
    }
}
