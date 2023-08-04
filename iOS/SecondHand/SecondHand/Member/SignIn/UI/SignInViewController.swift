//
//  LoginViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/20.
//
import UIKit

// TODO: - 로그인 페이지는 모달형식으로 어디서든지 띄워야 하기 때문에 탭바에 귀속되지 않는 독립적인 뷰컨트롤러로 변경 해야 함. - WWDC19
class SignInViewController: UIViewController {
    private var signInView = SignInView(frame: CGRect.zero)
    private var networkManager = SignInNetworkManager()
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
    private let accountInfoViewController: AccountInfoViewController = {
        let viewController = AccountInfoViewController()
        viewController.modalPresentationStyle = .fullScreen
        return viewController
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.addLoginView()
        self.setTitle("내 계정")
        self.observeDidTokenArrived()
        self.didTapButton()
    }

    private func addLoginView() {
        self.signInView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(signInView)
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.addConstraintToLoginView()
    }

    private func addConstraintToLoginView() {
        guard let navigationBarBottomAnchor = self.navigationController?.navigationBar.bottomAnchor,
              let tabBarTopAnchor = self.tabBarController?.tabBar.topAnchor else { return }
        let leadingConstraint: CGFloat = 16
        let trailingConstraint: CGFloat = -16
        let topConstraint: CGFloat = 80

        NSLayoutConstraint.activate([
            self.signInView.leadingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: leadingConstraint
            ),
            self.signInView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: trailingConstraint
            ),
            self.signInView.topAnchor.constraint(
                equalTo: navigationBarBottomAnchor,
                constant: topConstraint
            ),
            self.signInView.bottomAnchor.constraint(lessThanOrEqualTo: tabBarTopAnchor)
        ])
    }
    
    private func observeDidTokenArrived() {
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

            // 데이터 수신 성공시 토큰 저장 및 로그인 화면 띄움.
            SecretKeys.accessToken = response.data.token
            accountInfoViewController.sendData(response.data.memberInfo)
            self.navigationController?.pushViewController(
                accountInfoViewController,
                animated: true
            )

            // UserDefaults에 마지막 로그인 아이디를 저장.
            
            // Key-Chain에 로그인 아이디 : 패스워드 저장.
        }
    }
    
    private func didTapButton() {
        signInView.buttonTagSender = { buttonTag in
            switch buttonTag {
            case 0:
                self.signInWithGitHub()
            case 1:
                self.signIn()
            case 2:
                self.signUp()
            default:
                LogManager.generate(level: Level.info, LogMessage.incorretButtonTag)
            }
            return
        }
    }
    
    private func signInWithGitHub() {
        guard let githubURL = URL(string: "https://github.com/login/oauth/authorize?client_id=\(SecretKeys.clientID)") else {
            return
        }
        
        if UIApplication.shared.canOpenURL(githubURL) {
            UIApplication.shared.open(githubURL)
        }
    }
    
    private func signIn() {
        let enteredLoginData = signInView.getEnteredInfo()
        guard let id = enteredLoginData.0,
              let password = enteredLoginData.1 else { return }
        let loginInfo = LoginDTO(loginId: id, password: password)
        
        Task {
            guard let response = await networkManager.request(type: .signIn, data: loginInfo) else {
                self.present(self.loginAlertController, animated: true, completion: nil)
                return
            }
            SecretKeys.accessToken = response.data.token
            accountInfoViewController.sendData(response.data.memberInfo)
            self.navigationController?.pushViewController(
                accountInfoViewController,
                animated: true
            )
        }
    }
    
    private func signUp() {
        let signUpNavigation = UINavigationController(rootViewController: SignUpViewController())
        self.present(signUpNavigation, animated: true)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.signInView.clearTextFields()
    }
}

extension SignInViewController {
    enum LogMessage {
        static let incorretButtonTag = "잘못된 버튼 정보가 전달되었습니다."
    }
}
