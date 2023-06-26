//
//  LoginViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//
import UIKit

class LoginViewController: UIViewController {
    private var loginView = LoginView()
    private var accountInfoView = AccountInfoView()
    private var networkManager = LoginNetworkManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setViewControllerTitle(to: "내 계정")
        addObservers()
    }
    
    private func setViewControllerTitle(to title: String) {
        self.title = "\(title)"
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.layoutLoginView()
    }
    
    private func addObservers() {
        observeLogin()
        observeLoginByGithub()
        observeRegisterUser()
    }
}

// MARK: - Constraint 설정 메소드 추가
extension LoginViewController {
    private func layoutLoginView() {
        self.loginView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(loginView)
        
        guard let navigationBarBottomAnchor = self.navigationController?.navigationBar.bottomAnchor,
              let tabBarTopAnchor = self.tabBarController?.tabBar.topAnchor else { return }
        let leadingConstraint: CGFloat = 16
        let trailingConstraint: CGFloat = -16
        let topConstraint: CGFloat = 80
        
        NSLayoutConstraint.activate([
            self.loginView.leadingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: leadingConstraint
            ),
            self.loginView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: trailingConstraint
            ),
            self.loginView.topAnchor.constraint(
                equalTo: navigationBarBottomAnchor,
                constant: topConstraint
            ),
            self.loginView.bottomAnchor.constraint(lessThanOrEqualTo: tabBarTopAnchor)
        ])
    }
    
    private func layoutAccountInfoView() {
        self.loginView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(loginView)
        
        guard let navigationBarBottomAnchor = self.navigationController?.navigationBar.bottomAnchor,
              let tabBarTopAnchor = self.tabBarController?.tabBar.topAnchor else { return }
        let leadingConstraint: CGFloat = 16
        let trailingConstraint: CGFloat = -16
        let topConstraint: CGFloat = 96
        
        NSLayoutConstraint.activate([
            self.accountInfoView.leadingAnchor.constraint(
                equalTo: self.view.leadingAnchor,
                constant: leadingConstraint
            ),
            self.accountInfoView.trailingAnchor.constraint(
                equalTo: self.view.trailingAnchor,
                constant: trailingConstraint
            ),
            self.accountInfoView.topAnchor.constraint(
                equalTo: navigationBarBottomAnchor,
                constant: topConstraint
            ),
            self.accountInfoView.bottomAnchor.constraint(greaterThanOrEqualTo: tabBarTopAnchor)
        ])
    }
}

// MARK: - Observer 적용 메소드
extension LoginViewController {
    private func observeLogin() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(login),
            name: .account.login,
            object: nil
        )
    }
    
    @objc private func login(_ notification: Notification) {
        DispatchQueue.main.async {
            self.loginView.removeFromSuperview()
            self.view.addSubview(self.accountInfoView)
            self.layoutAccountInfoView()
        }
    }
    
    private func observeLoginByGithub() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(loginByGithub),
            name: .account.githubLogin,
            object: nil
        )
    }
    
    @objc private func loginByGithub(_ notification: Notification) {
        
    }
    
    private func observeRegisterUser() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(registerUser),
            name: .account.register,
            object: nil
        )
    }
    
    @objc private func registerUser(_ notification: Notification) {
        
    }
}
