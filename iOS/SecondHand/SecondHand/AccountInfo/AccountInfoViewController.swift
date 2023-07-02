//
//  AccountViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/26.
//

import UIKit

class AccountInfoViewController: UIViewController {
    private var accountInfoView = AccountInfoView()
    private var signOutButton: UIButton = {
        let button = UIButton()
        button.titleLabel?.font = .typo.subHead
        button.tintColor = .white
        button.setTitle("로그아웃", for: .normal)
        button.layer.cornerRadius = 8
        button.backgroundColor = .orange
        
        var configuration = UIButton.Configuration.plain()
        configuration.contentInsets = NSDirectionalEdgeInsets(
            top: 16,
            leading: 20,
            bottom: 16,
            trailing: 20
        )
        button.configuration = configuration
        return button
    }()
    private var useCase = AccountInfoUseCase()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.addSubviews()
        self.navigationItem.hidesBackButton = true
        signOutButton.addTarget(
            self,
            action: #selector(didTapSignOutButton),
            for: .touchUpInside
        )
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.accountInfoView.configure(accountInfo: self.useCase.sendAccountInfo())
    }
    
    func sendData(_ data: LoginResponseDTO.MemberInfo) {
        self.useCase.loadData(data)
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        addConstraints()
    }
    
    @objc private func didTapSignOutButton() {
        SecretKeys.accessToken = ""
        self.navigationController?.popViewController(animated: true)
    }
    
    func addConstraints() {
        self.layoutAccountInfoView()
        self.addConstraintToSignOutButton()
    }
}

// MARK: - Cosntraint 설정 메소드
extension AccountInfoViewController {
    private func addSubviews() {
        let subViews = [
            self.accountInfoView,
            self.signOutButton
        ]
        
        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.view.addSubview($0)
        }
    }
    
    private func layoutAccountInfoView() {
        guard let navigationBarBottomAnchor = self.navigationController?.navigationBar.bottomAnchor else { return }
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
            )
        ])
    }
    
    private func addConstraintToSignOutButton() {
        let topConstraint: CGFloat = 276
        guard let tabBarTopAnchor = self.tabBarController?.tabBar.topAnchor else { return }
        
        NSLayoutConstraint.activate([
            self.signOutButton.leadingAnchor.constraint(equalTo: self.accountInfoView.leadingAnchor),
            self.signOutButton.trailingAnchor.constraint(equalTo: self.accountInfoView.trailingAnchor),
            self.signOutButton.topAnchor.constraint(
                equalTo: self.accountInfoView.bottomAnchor,
                constant: topConstraint
            ),
            self.signOutButton.bottomAnchor.constraint(lessThanOrEqualTo: tabBarTopAnchor)
        ])
    }
}
