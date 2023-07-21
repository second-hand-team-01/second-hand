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
    var sellerInfoView = SellerInfoView()
    var statusButton = UIButton()
    var productInfoView = ProductInfoView()
    var communicationInfoView = CommunicationInfoView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubviews()
        self.addConstraints()
        self.setUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    func update(by data: DetailModel) {
        guard let productImageURLString = ImageCacheManager.shared.object(forKey: NSString(string: "98/0"))?.path else {
            print("키 못찾음")
            return
        }
        
        DispatchQueue.main.async {
            self.productImageView.image = UIImage(contentsOfFile: productImageURLString)
            self.sellerInfoView.update(by: data.sellerName)
            self.productInfoView.update(by: data.productInfo)
            self.communicationInfoView.update(by: data.userInteractionCount)
        }
    }
    
    private func setUI() {
        self.productImageView.tintColor = .orange
        self.statusButton = self.makeStatusButton()
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
    
    private func addSubviews() {
        let subViews = [
            self.productImageView,
            self.pageControl,
            self.sellerInfoView,
            self.statusButton,
            self.productInfoView
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
        self.addConstraintsToProductImageView()
        self.addConstraintsToPageControl()
        self.addConstraintsToSellerInfo()
        self.addConstraintsToStatusButton()
        self.addConstraintsToProductInfo()
    }
    
    private func addConstraintsToProductImageView() {
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            self.productImageView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.productImageView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.productImageView.topAnchor.constraint(equalTo: self.topAnchor),
            self.productImageView.heightAnchor.constraint(
                equalTo: productImageView.widthAnchor,
                multiplier: heightRatio
            )
        ])
    }
    
    private func addConstraintsToPageControl() {
        NSLayoutConstraint.activate([
            self.pageControl.leadingAnchor.constraint(equalTo: self.productImageView.leadingAnchor),
            self.pageControl.trailingAnchor.constraint(equalTo: self.productImageView.trailingAnchor),
            self.pageControl.bottomAnchor.constraint(equalTo: productImageView.bottomAnchor),
            self.pageControl.heightAnchor.constraint(equalToConstant: 20)
        ])
    }
    
    private func addConstraintsToSellerInfo() {
        NSLayoutConstraint.activate([
            self.sellerInfoView.leadingAnchor.constraint(equalTo: productImageView.leadingAnchor, constant: 16),
            self.sellerInfoView.trailingAnchor.constraint(equalTo: productImageView.trailingAnchor, constant: -16),
            self.sellerInfoView.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            self.sellerInfoView.heightAnchor.constraint(equalToConstant: 60)
        ])
    }
    
    private func addConstraintsToStatusButton() {
        NSLayoutConstraint.activate([
            self.statusButton.leadingAnchor.constraint(equalTo: sellerInfoView.leadingAnchor),
            self.statusButton.topAnchor.constraint(equalTo: sellerInfoView.bottomAnchor, constant: 16)
        ])
    }
    
    private func addConstraintsToProductInfo() {
        NSLayoutConstraint.activate([
            self.productInfoView.leadingAnchor.constraint(equalTo: sellerInfoView.leadingAnchor),
            self.productInfoView.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfoView.trailingAnchor),
            self.productInfoView.topAnchor.constraint(equalTo: statusButton.bottomAnchor, constant: 16),
            self.productInfoView.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}

extension DetailContentView {
    static let notiName = Notification.Name("didChangeStatus")
}
