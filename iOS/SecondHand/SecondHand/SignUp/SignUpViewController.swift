//
//  SignUpViewController.swift
//  SecondHand
//
//  Created by apple on 2023/06/21.
//

import UIKit

class SignUpViewController: UIViewController {
    private let signUpView = SignUpView()
    private var networkManager = SignUpNetworkManager()
    private var signUpAlertController: UIAlertController = {
        let alertController = UIAlertController(
            title: "회원가입 실패",
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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
    }
    
    override func viewWillLayoutSubviews() {
        self.configureNavigationItem()
        self.layoutSignUpView()
    }
    
    @objc private func locationAddButtonTapped() {
    }
}

extension SignUpViewController {
    private func configureNavigationItem() {
        self.title = "회원가입"
        let closeButton = UIBarButtonItem(title: "닫기", style: .plain, target: self, action: #selector(closeButtonTapped))
        let doneButton = UIBarButtonItem(title: "완료", style: .plain, target: self, action: #selector(doneButtonTapped))
        
        self.navigationItem.leftBarButtonItem = closeButton
        self.navigationItem.rightBarButtonItem = doneButton
    }
    
    @objc private func closeButtonTapped() {
        self.dismiss(animated: true)
    }
    
    @objc private func doneButtonTapped() {
        let enteredSignUpData = signUpView.getEnteredInfo()
        guard let id = enteredSignUpData.0,
              let password = enteredSignUpData.1 else { return }
        let signUpInfo = SignUpDTO(loginId: id, password: password, imageURL: "", mainLocationIdx: "6", subLocationIdx: "2")
        
        Task {
            let response = await networkManager.request(signUpInfo: signUpInfo)
            guard response != nil else {
                self.present(self.signUpAlertController, animated: true, completion: nil)
                return
            }
            self.dismiss(animated: true)
        }
    }
}

extension SignUpViewController {
    private func layoutSignUpView() {
        self.signUpView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(signUpView)
        
        guard let navigationBarBottomAnchor = self.navigationController?.navigationBar.bottomAnchor else { return }
        
        NSLayoutConstraint.activate([
            self.signUpView.leadingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: 16
            ),
            self.signUpView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -16
            ),
            self.signUpView.topAnchor.constraint(
                equalTo: navigationBarBottomAnchor,
                constant: 80
            ),
            self.signUpView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor)
        ])
    }
}
