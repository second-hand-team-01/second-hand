//
//  LoginButtonGroupView+makeButton.swift
//  SecondHand
//
//  Created by Wood on 2023/06/22.
//

import UIKit

extension LoginButtonGroupView {
    func addAction(to button: UIButton) -> UIButton {
        let button = button
        button.addTarget(
            self,
            action: #selector(self.didTapButton),
            for: .touchUpInside
        )
        
        return button
    }
    
    @objc func didTapButton(_ sender: UIButton) {
        let notiName: NSNotification.Name
        let buttonTag: Int
        
        switch sender.tag {
        case 0:
            notiName = .account.githubLogin
            buttonTag = ButtonTag.githubLogin
        case 1:
            notiName = .account.login
            buttonTag = ButtonTag.login
        case 2:
            notiName = .account.register
            buttonTag = ButtonTag.register
        default:
            return
        }
        
        NotificationCenter.default.post(
            name: notiName,
            object: buttonTag
        )
    }
}

// MARK: - 버튼 Action 설정에 필요한 Tag 값
extension LoginButtonGroupView {
    enum ButtonTag {
        static let githubLogin = 0
        static let login = 1
        static let register = 2
    }
}

// MARK: - 내 계정 화면 Notification 이름
extension LoginButtonGroupView {
    struct NotiName {
        let githubLogin = Notification.Name("didTapGithubLoginButton")
        let login = Notification.Name("didTapLoginButton")
        let register = Notification.Name("didTapRegisterButton")
    }
}

// MARK: - Notification 이름에 편리한 접근을 하기 위해 변수 선언
extension Notification.Name {
    static let account = LoginButtonGroupView.NotiName()
}
