//
//  SignUpView.swift
//  SecondHand
//
//  Created by apple on 2023/06/26.
//

import UIKit

class SignUpView: UIView {
    private let cameraSymbol = {
        let button = UIButton()
        let cameraImage = UIImage(systemName: "camera")
        button.layer.cornerRadius = 40
        button.clipsToBounds = true
        button.setImage(cameraImage, for: .normal)
        button.layer.borderWidth = 1.0
        button.layer.borderColor = ColorPalette.neutral.border?.cgColor
        
//        button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
        
        return button
    }()
    
    private let idLabel = UILabel()
    private let idTextfield = UITextField()
    private let passwordLabel = UILabel()
    private let passwordTextfield = UITextField()
    private let locationAddButton =  {
        let button = UIButton()
        button.layer.cornerRadius = 8
        button.layer.borderWidth = 1.0
        button.layer.borderColor = ColorPalette.neutral.border?.cgColor
        button.backgroundColor = .white
        button.tintColor = .black
        button.setTitle(
            "+ 위치저장",
            for: .normal
        )

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
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setDeafultText()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setDeafultText()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.layoutConstraints()
    }
    
    private func setDeafultText() {
        self.idLabel.text = DefaultText.id
        self.idTextfield.placeholder = DefaultText.idInput
        self.passwordLabel.text = DefaultText.password
        self.passwordTextfield.placeholder = DefaultText.passwordInput
    }
    
    private func layoutConstraints() {
        addSubviews()
        layoutCameraSymbolView()
        layoutIdInputView()
        layoutPasswordInputView()
        layoutLocationAddButtonView()
    }
}

extension SignUpView {
    func getEnteredInfo() -> (String?, String?) {
        return (getEnteredId(), getEnteredPassword())
    }
    
    func getEnteredId() -> String? {
        return self.idTextfield.text
    }
    
    func getEnteredPassword() -> String? {
        return self.passwordTextfield.text
    }
}

// MARK: - 하위뷰 Constraint 부여
extension SignUpView {
    private func addSubviews() {
        let subViews = [
            self.cameraSymbol,
            self.idLabel,
            self.idTextfield,
            self.passwordLabel,
            self.passwordTextfield,
            self.locationAddButton
        ]

        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview($0)
        }
    }

    private func layoutCameraSymbolView() {
        NSLayoutConstraint.activate([
            self.cameraSymbol.topAnchor.constraint(equalTo: self.topAnchor),
            self.cameraSymbol.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            self.cameraSymbol.heightAnchor.constraint(equalToConstant: 80),
            self.cameraSymbol.widthAnchor.constraint(equalToConstant: 80)
        ])
    }

    private func layoutIdInputView() {
        NSLayoutConstraint.activate([
            self.idLabel.topAnchor.constraint(equalTo: self.cameraSymbol.bottomAnchor, constant: 24),
            self.idLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            
            self.idTextfield.leadingAnchor.constraint(equalTo: self.idLabel.trailingAnchor, constant: 52.74),
            self.idTextfield.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            self.idTextfield.centerYAnchor.constraint(equalTo: self.idLabel.centerYAnchor)
        ])
    }
    
    private func layoutPasswordInputView() {
        NSLayoutConstraint.activate([
            self.passwordLabel.topAnchor.constraint(equalTo: self.idLabel.bottomAnchor, constant: 30),
            self.passwordLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            
            self.passwordTextfield.leadingAnchor.constraint(equalTo: self.idTextfield.leadingAnchor),
            self.passwordTextfield.trailingAnchor.constraint(lessThanOrEqualTo: self.trailingAnchor),
            self.passwordTextfield.centerYAnchor.constraint(equalTo: self.passwordLabel.centerYAnchor)
        ])
    }
    
    private func layoutLocationAddButtonView() {
        NSLayoutConstraint.activate([
            self.locationAddButton.topAnchor.constraint(equalTo: self.passwordTextfield.bottomAnchor, constant: 40),
            self.locationAddButton.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.locationAddButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.locationAddButton.centerXAnchor.constraint(equalTo: self.cameraSymbol.centerXAnchor)
        ])
    }
}

extension SignUpView {
    enum DefaultText {
        static let id = "아이디"
        static let idInput = "아이디를 입력하세요"
        static let password = "비밀번호"
        static let passwordInput = "비밀번호를 입력하세요"
    }
}
