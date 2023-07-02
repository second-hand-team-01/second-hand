//
//  DetailContentView.swift
//  Pods
//
//  Created by Wood on 2023/06/14.
//

import UIKit

class DetailContentView: UIView {
    var productImageView = UIImageView()
    var pageControl = UIPageControl()
    var sellerInfo = SellerInfo()
    var statusButton = UIButton()
    var productInfo = ProductInfo()
    var communicationInfo = CommunicationInfo()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        statusButton = makeStatusButton()
        setUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        layoutConstraint()
    }

    func configure(by data: ItemDetailDTO.Detail, image url: String) {
        sellerInfo.configure(nameLabel: data.seller.sellerId)
        productInfo.configure(
            name: data.name,
            annotation: "\(data.category.name) ・ 1분전",
            description: data.description
        )
        communicationInfo.configure(
            chatCount: data.chat,
            favoriteCount: data.interest,
            viewsCount: data.view
        )
    }
    
    private func setUI() {
        productImageView.tintColor = .orange
        statusButton = makeStatusButton()
    }
    
    // swiftlint:disable:next function_body_length
    private func makeStatusButton() -> UIButton {
        let button = UIButton(type: .system)
        
        button.setTitle("판매중", for: .normal)
        button.setImage(UIImage(systemName: "chevron.down"), for: .normal)
        button.titleLabel?.font = .typo.caption1
        button.semanticContentAttribute = .forceRightToLeft
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
}

// MARK: - Constraint 설정
extension DetailContentView {
    private func addSubviews() {
        let subViews = [
            productImageView,
            pageControl,
            sellerInfo,
            statusButton,
            productInfo
        ]
        
        subViews.forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func layoutConstraint() {
        addSubviews()
        layoutProductImageView()
        layoutPageControl()
        layoutSellerInfo()
        layoutStatusButton()
        layoutProductInfo()
    }
    
    private func layoutProductImageView() {
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            productImageView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            productImageView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            productImageView.topAnchor.constraint(equalTo: self.topAnchor),
            productImageView.heightAnchor.constraint(equalTo: productImageView.widthAnchor,
                                                     multiplier: heightRatio)
        ])
    }
    
    private func layoutPageControl() {
        NSLayoutConstraint.activate([
            pageControl.leadingAnchor.constraint(equalTo: self.productImageView.leadingAnchor),
            pageControl.trailingAnchor.constraint(equalTo: self.productImageView.trailingAnchor),
            pageControl.bottomAnchor.constraint(equalTo: productImageView.bottomAnchor),
            pageControl.heightAnchor.constraint(equalToConstant: 20)
        ])
    }
    
    private func layoutSellerInfo() {
        NSLayoutConstraint.activate([
            sellerInfo.leadingAnchor.constraint(equalTo: productImageView.leadingAnchor, constant: 16),
            sellerInfo.trailingAnchor.constraint(equalTo: productImageView.trailingAnchor, constant: -16),
            sellerInfo.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            sellerInfo.heightAnchor.constraint(equalToConstant: 60)
        ])
    }
    
    private func layoutStatusButton() {
        NSLayoutConstraint.activate([
            statusButton.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            statusButton.topAnchor.constraint(equalTo: sellerInfo.bottomAnchor, constant: 16)
        ])
    }
    
    private func layoutProductInfo() {
        NSLayoutConstraint.activate([
            productInfo.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            productInfo.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            productInfo.topAnchor.constraint(equalTo: statusButton.bottomAnchor, constant: 16),
            productInfo.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}

extension DetailContentView {
    static let notiName = Notification.Name("didChangeStatus")
}
