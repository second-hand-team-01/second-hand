//
//  AccountViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/26.
//

import UIKit

class AccountInfoViewController: UIViewController {
    private var accountInfoView = AccountInfoView()
    var userName: String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.accountInfoView.configure(userName: userName)
        self.navigationItem.hidesBackButton = true
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        layoutAccountInfoView()
    }
}

// MARK: - Cosntraint 설정 메소드
extension AccountInfoViewController {
    private func layoutAccountInfoView() {
        self.accountInfoView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(accountInfoView)
        
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
