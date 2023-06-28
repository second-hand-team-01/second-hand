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
        imageView.image = UIImage(systemName: "person.fill")
        imageView.layer.cornerRadius = imageView.frame.height / 2
        return imageView
    }()
    private var userNameLabel: UILabel = {
        let label = UILabel()
        label.font = .typo.headLine
        label.textAlignment = .center
        return label
    }()
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.addConstraints()
    }

    private func addConstraints() {
        self.addSubviews()
        self.addConstraintToProfileImageView()
        self.addConstraintToUserNameLabel()
    }
    
    func configure(userName: String) {
        self.userNameLabel.text = "\(userName)"
    }
}

// MARK: - 하위뷰 Constraint 설정
extension AccountInfoView {
    private func addSubviews() {
        let subViews = [
            self.profileImageView,
            self.userNameLabel
        ]
        
        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview($0)
        }
    }
    
    private func addConstraintToProfileImageView() {
        guard let screenWidth = self.window?.windowScene?.screen.bounds.size.width else { return }
        let widthRatio: CGFloat = 0.2
        
        NSLayoutConstraint.activate([
            self.profileImageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            self.profileImageView.topAnchor.constraint(equalTo: self.topAnchor),
            self.profileImageView.widthAnchor.constraint(equalToConstant: screenWidth * widthRatio),
            self.profileImageView.heightAnchor.constraint(equalTo: self.profileImageView.widthAnchor)
        ])
    }
    
    private func addConstraintToUserNameLabel() {
        let topConstraint: CGFloat = 24
        
        NSLayoutConstraint.activate([
            self.userNameLabel.leadingAnchor.constraint(
                equalTo: self.leadingAnchor),
            self.userNameLabel.trailingAnchor.constraint(
                equalTo: self.trailingAnchor),
            self.userNameLabel.topAnchor.constraint(
                equalTo: self.profileImageView.bottomAnchor,
                constant: topConstraint
            ),
            self.userNameLabel.centerXAnchor.constraint(equalTo: self.centerXAnchor)
        ])
    }
}
