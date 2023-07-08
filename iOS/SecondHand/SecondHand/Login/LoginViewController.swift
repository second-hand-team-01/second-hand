//
//  LoginViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//
import UIKit

// TODO: - 로그인 페이지는 모달형식으로 어디서든지 띄워야 하기 때문에 탭바에 귀속되지 않는 독립적인 뷰컨트롤러로 변경 해야 함. - WWDC19
class LoginViewController: UIViewController {
    private var loginView = LoginView(frame: CGRect.zero)
    private var networkManager = LoginNetworkManager()
    private var loginAlertController: UIAlertController = {
        let alertController = UIAlertController(
            title: "로그인 실패",
            message: nil,
            preferredStyle: .alert
        )
        let alertAction = UIAlertAction(
            title: "확인",
            style: .default
        )
        alertController.addAction(alertAction)
        return alertController
    }()
    let viewController: AccountInfoViewController = {
        let viewController = AccountInfoViewController()
        viewController.modalPresentationStyle = .fullScreen
        return viewController
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.loginView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(loginView)
        self.setViewControllerTitle(to: "내 계정")
        addObservers()
    }
    
    private func setViewControllerTitle(to title: String) {
        self.title = "\(title)"
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.addConstraintToLoginView()
    }
    
    private func addObservers() {
        observeLogin()
        observeLoginByGithub()
        observeRegisterUser()
        observeSceneDelegate()
    }
}

// MARK: - Constraint 설정 메소드 추가
extension LoginViewController {
    private func addConstraintToLoginView() {
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
        let enteredLoginData = loginView.getEnteredInfo()
        guard let id = enteredLoginData.0,
              let password = enteredLoginData.1 else { return }
        let loginInfo = LoginDTO(loginId: id, password: password)
        
        Task {
            guard let response = await networkManager.request(type: .signIn, data: loginInfo) else {
                self.present(self.loginAlertController, animated: true, completion: nil)
                return
            }
            SecretKeys.accessToken = response.data.token
            viewController.sendData(response.data.memberInfo)
            self.navigationController?.pushViewController(
                viewController,
                animated: true
            )
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
    
    private func observeSceneDelegate() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(getAccessToken),
            name: SceneDelegate.notification,
            object: nil)
    }
    
    // TODO: - WKWebView 사용할지 말지 결정
    @objc private func getAccessToken(_ notification: Notification) {
        Task {
            guard let response = await networkManager.request(type: .githubSignIn, data: "") else {
                self.present(self.loginAlertController, animated: true, completion: nil)
                return
            }
            SecretKeys.accessToken = response.data.token
            viewController.sendData(response.data.memberInfo)
            self.navigationController?.pushViewController(
                viewController,
                animated: true
            )
        }
    }
    
    @objc private func loginByGithub(_ notification: Notification) {
        guard let githubURL = URL(string: "https://github.com/login/oauth/authorize?client_id=3ac935cf627da08c8f03") else {
            return
        }
        
        if UIApplication.shared.canOpenURL(githubURL) {
            UIApplication.shared.open(githubURL)
        }
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
        let signUpNavigation = UINavigationController(rootViewController: SignUpViewController())
        self.present(signUpNavigation, animated: true)
    }
}
