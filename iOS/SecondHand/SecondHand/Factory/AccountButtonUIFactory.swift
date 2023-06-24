//
//  AccountButtonFactory.swift
//  SecondHand
//
//  Created by Wood on 2023/06/22.
//

import UIKit

struct AccountButtonUIFactory {
    enum ButtonType {
        case github
        case login
        case register
    }
    
    enum ButtonName {
        static let githubLogin = "Github로 로그인"
        static let login = "로그인"
        static let register = "회원가입"
    }
    
    enum ButtonTag {
        static let githubLogin = 0
        static let login = 1
        static let register = 2
    }
    
    static func make(type: ButtonType) -> UIButton {
        let backgroundColor: UIColor
        let tintColor = UIColor.white
        let title: String

        switch type {
        case .github:
            backgroundColor = .black
            title = ButtonName.githubLogin
        case .login:
            backgroundColor = .orange
            title = ButtonName.login
        case .register:
            backgroundColor = .lightGray
            title = ButtonName.register
        }

        let button = UIButton()
        button.layer.cornerRadius = 8
        button.backgroundColor = backgroundColor
        button.tintColor = tintColor
        button.setTitle(
            title,
            for: .normal
        )
        
        return addInset(to: button)
    }
    
    static func addInset(to button: UIButton) -> UIButton {
        let button = button
        var configuration = UIButton.Configuration.plain()
        configuration.contentInsets = NSDirectionalEdgeInsets(
            top: 16,
            leading: 20,
            bottom: 16,
            trailing: 20
        )
        button.configuration = configuration
        
        return button
    }
}
