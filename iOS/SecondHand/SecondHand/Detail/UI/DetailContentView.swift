//
//  DetailContentView.swift
//  Pods
//
//  Created by Wood on 2023/06/14.
//

import UIKit

class DetailContentView: UIView {
    private var productImageViewer = ProductImageViewer()
    private var sellerInfoView = SellerInfoView()
    private var statusButton = UIButton()
    private var productInfoView = ProductInfoView()
    private var communicationInfoView = CommunicationInfoView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.makeStatusButtonUI()
        self.addSubviews()
        self.addConstraints()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    func update(by data: DetailModel) {
        DispatchQueue.main.async {
            self.productImageViewer.update(by: data.imageKeys)
            self.sellerInfoView.update(by: data.sellerName)
            self.updateStatusButon(by: data.status, with: data.sellerIndex)
            self.productInfoView.update(by: data.productInfo)
            self.communicationInfoView.update(by: data.userInteractionCount)
        }
    }
    
    private func updateStatusButon(by status: String, with sellerIndex: Int) {
        self.statusButton.setTitle(status, for: .normal)
        if sellerIndex != SecretKeys.userIndex {
            self.statusButton.isEnabled = false
        } else {
            self.statusButton.isEnabled = true
        }
    }
    
    private func makeStatusButtonUI() {
        self.statusButton = self.makeStatusButton()
    }
    
    // swiftlint:disable:next function_body_length
    private func makeStatusButton() -> UIButton {
        let button = UIButton(type: .system)
        button.titleLabel?.adjustsFontForContentSizeCategory = true
        button.translatesAutoresizingMaskIntoConstraints = false
        button.contentVerticalAlignment = .center
        button.contentHorizontalAlignment = .leading
        button.semanticContentAttribute = .forceRightToLeft
        
        button.setTitle("판매중", for: .normal)
        let chevronImage = UIImage(systemName: "chevron.down")?.withAlignmentRectInsets(
            UIEdgeInsets(
                top: -5,
                left: -2,
                bottom: -5,
                right: -2
            )
        )
        button.setImage(chevronImage, for: .normal)
        button.titleLabel?.font = .typo.caption1
        button.tintColor = .black
        button.layer.borderColor = UIColor.gray.cgColor
        button.layer.borderWidth = 0.2
        button.layer.cornerRadius = 8

        var configuration = UIButton.Configuration.plain()
        configuration.contentInsets = NSDirectionalEdgeInsets(
            top: 8,
            leading: 16,
            bottom: 8,
            trailing: 16
        )
        button.configuration = configuration

        let onReservation = UIAction(
            title: "예약중",
            handler: { _ in
                button.setTitle("예약중", for: .normal)
                return
            })
        let onSold = UIAction(
            title: "판매완료",
            handler: { _ in
                button.setTitle("판매완료", for: .normal)
                return
            }
        )

        button.menu = UIMenu(
            options: .displayInline,
            children: [onReservation, onSold])
        
        button.addAction(
            UIAction(
                handler: { _ in
                    NotificationCenter.default.post(
                        name: DetailContentView.notiName,
                        object: button.titleLabel?.text
                    )
            }),
            for: .touchUpInside)
        
        return button
    }
    
    private func addSubviews() {
        let subViews = [
            self.productImageViewer,
            self.sellerInfoView,
            self.statusButton,
            self.productInfoView,
            self.communicationInfoView
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
}

// MARK: - Constraint 설정
extension DetailContentView {
    private func addConstraints() {
        self.addConstraintsToProductImageViewer()
        self.addConstraintsToSellerInfoView()
        self.addConstraintsToStatusButton()
        self.addConstraintsToProductInfoView()
        self.addConstraintsToCommunicationInfoView()
    }
    
    private func addConstraintsToProductImageViewer() {
        NSLayoutConstraint.activate([
            self.productImageViewer.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.productImageViewer.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.productImageViewer.topAnchor.constraint(equalTo: self.topAnchor)
        ])
    }
    
    private func addConstraintsToSellerInfoView() {
        NSLayoutConstraint.activate([
            self.sellerInfoView.leadingAnchor.constraint(
                equalTo: self.productImageViewer.leadingAnchor,
                constant: 16
            ),
            self.sellerInfoView.trailingAnchor.constraint(equalTo: self.productImageViewer.trailingAnchor, constant: -16),
            self.sellerInfoView.topAnchor.constraint(equalTo: self.productImageViewer.bottomAnchor, constant: 16),
            self.sellerInfoView.heightAnchor.constraint(equalToConstant: 60)
        ])
    }
    
    private func addConstraintsToStatusButton() {
        NSLayoutConstraint.activate([
            self.statusButton.leadingAnchor.constraint(equalTo: self.sellerInfoView.leadingAnchor),
            self.statusButton.trailingAnchor.constraint(lessThanOrEqualTo: self.sellerInfoView.trailingAnchor),
            self.statusButton.topAnchor.constraint(equalTo: self.sellerInfoView.bottomAnchor, constant: 16)
        ])
    }
    
    private func addConstraintsToProductInfoView() {
        NSLayoutConstraint.activate([
            self.productInfoView.leadingAnchor.constraint(equalTo: self.sellerInfoView.leadingAnchor),
            self.productInfoView.trailingAnchor.constraint(equalTo: self.sellerInfoView.trailingAnchor),
            self.productInfoView.topAnchor.constraint(equalTo: self.statusButton.bottomAnchor, constant: 16)
        ])
    }
    
    private func addConstraintsToCommunicationInfoView() {
        NSLayoutConstraint.activate([
            self.communicationInfoView.leadingAnchor.constraint(equalTo: self.productInfoView.leadingAnchor),
            self.communicationInfoView.trailingAnchor.constraint(equalTo: self.sellerInfoView.trailingAnchor),
            self.communicationInfoView.topAnchor.constraint(
                equalTo: self.productInfoView.bottomAnchor,
                constant: 16
            ),
            self.communicationInfoView.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}

extension DetailContentView {
    static let notiName = Notification.Name("didChangeStatus")
}
