//
//  AccountInfoView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/25.
//

import UIKit

class AccountInfoView: UIView {
    private var profileImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.cornerRadius = imageView.frame.height / 2
        return imageView
    }()
    private var userNameLabel: UILabel = {
        let label = UILabel()
        label.font = .typo.headLine
        return label
    }()
    private var logoutButton: UIButton = {
        let button = UIButton()
        button.titleLabel?.font = .typo.subHead
        return button
    }()
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.layoutConstraints()
    }

    
    private func layoutConstraints() {
        self.addSubviews()
        self.layoutProfileImageView()
        self.layoutUserNameLabel()
        self.layoutLogoutButton()
    }
}

// MARK: - 하위뷰 Constraint 설정
extension AccountInfoView {
    private func addSubviews() {
        let subViews = [
            self.profileImageView,
            self.userNameLabel,
            self.logoutButton
        ]
        
        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview($0)
        }
    }
    
    private func layoutProfileImageView() {
        let topConstant: CGFloat = 96
        guard let screenWidth = self.window?.windowScene?.screen.bounds.size.width else { return }
        let widthRatio: CGFloat = 0.2
        
        NSLayoutConstraint.activate([
            self.profileImageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            self.profileImageView.topAnchor.constraint(
                equalTo: self.topAnchor,
                constant: topConstant
            ),
            self.profileImageView.widthAnchor.constraint(equalToConstant: screenWidth * widthRatio),
            self.profileImageView.heightAnchor.constraint(equalTo: self.profileImageView.widthAnchor)
        ])
    }
    
    private func layoutUserNameLabel() {
        let leadingConstraint: CGFloat = 15
        let trailingConstraint: CGFloat = -15
        let topConstraint: CGFloat = 24
        
        NSLayoutConstraint.activate([
            self.userNameLabel.leadingAnchor.constraint(
                equalTo: self.leadingAnchor,
                constant: leadingConstraint
            ),
            self.userNameLabel.trailingAnchor.constraint(
                equalTo: self.trailingAnchor,
                constant: trailingConstraint
            ),
            self.userNameLabel.topAnchor.constraint(
                equalTo: self.profileImageView.bottomAnchor,
                constant: topConstraint
            ),
            self.userNameLabel.centerXAnchor.constraint(equalTo: self.centerXAnchor)
        ])
    }
    
    private func layoutLogoutButton() {
        let leadingConstraint: CGFloat = 16
        let trailingConstraint: CGFloat = -16
        let topConstraint: CGFloat = 276
        
        NSLayoutConstraint.activate([
            self.logoutButton.leadingAnchor.constraint(
                equalTo: self.leadingAnchor,
                constant: leadingConstraint
            ),
            self.logoutButton.trailingAnchor.constraint(
                equalTo: self.trailingAnchor,
                constant: trailingConstraint
            ),
            self.logoutButton.topAnchor.constraint(
                equalTo: self.userNameLabel.bottomAnchor,
                constant: topConstraint
            ),
            self.logoutButton.bottomAnchor.constraint(greaterThanOrEqualTo: self.bottomAnchor)
        ])
    }
}
