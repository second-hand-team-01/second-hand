//
//  DetailViewcontroller.swift
//  SecondHand
//
//  Created by Wood on 2023/06/11.
//

import UIKit

class DetailViewController: UIViewController {
    var scrollView = UIScrollView()
    var contentView = UIView()
    var productImageView = UIImageView()
    var pageControl = UIPageControl()
    var sellerInfo = SellerInfo()
    var statusButton = UIButton()
    var titleLabel = UILabel()
    var categoryLabel = UILabel()
    var uploadTimeLabel = UILabel()
    var descriptionLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        setUI()
        sellerInfo.configure(name: "samsamisgu")
        titleLabel.text = "빈티지 롤러 스케이트"
        categoryLabel.text = "가구/인테리어"
        uploadTimeLabel.text = "1분전"
        descriptionLabel.numberOfLines = 0
        descriptionLabel.text = "어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다\n촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다. 새 제품으로 보존된 제품으로 전용박스까지 보내드립니다.\n 사이즈는 235 입니다."
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        layoutConstraint()
    }
    
    private func setUI() {
        self.view.backgroundColor = .white
        sellerInfo.layer.cornerRadius = sellerInfo.frame.height / 2
        productImageView.backgroundColor = .green
        pageControl.backgroundColor = .yellow
        sellerInfo.backgroundColor = .gray
        statusButton = makeStatusButton()
    }
    
    private func layoutConstraint() {
        layoutScrollView()
        layoutContentView()
        layoutProductImageView()
        layoutPageControl()
        layoutSellerInfo()
        layoutStatusButton()
        layoutTitleLabel()
        layoutCategoryLabel()
        layoutUploadTimeLabel()
        layoutDescriptionLabel()
    }
    
    private func layoutScrollView() {
        self.view.addSubview(scrollView)
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            scrollView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            scrollView.topAnchor.constraint(equalTo: self.view.topAnchor),
            scrollView.bottomAnchor.constraint(equalTo: (self.navigationController?.toolbar.topAnchor) ?? self.view.bottomAnchor)
        ])
    }
    
    private func layoutContentView() {
        scrollView.addSubview(contentView)
        contentView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            contentView.leadingAnchor.constraint(equalTo: self.scrollView.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: self.scrollView.trailingAnchor),
            contentView.topAnchor.constraint(equalTo: self.view.topAnchor),
            contentView.bottomAnchor.constraint(equalTo: self.scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor)
        ])
    }
    
    private func layoutProductImageView() {
        self.contentView.addSubview(productImageView)
        productImageView.translatesAutoresizingMaskIntoConstraints = false
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            productImageView.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor),
            productImageView.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor),
            productImageView.topAnchor.constraint(equalTo: self.contentView.topAnchor),
            productImageView.heightAnchor.constraint(equalTo: productImageView.widthAnchor,
                                                     multiplier: heightRatio)
        ])
    }
    
    private func layoutPageControl() {
        self.contentView.addSubview(pageControl)
        pageControl.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            pageControl.leadingAnchor.constraint(equalTo: self.productImageView.leadingAnchor),
            pageControl.trailingAnchor.constraint(equalTo: self.productImageView.trailingAnchor),
            pageControl.bottomAnchor.constraint(equalTo: productImageView.bottomAnchor),
            pageControl.heightAnchor.constraint(equalToConstant: 20)
        ])
    }
    
    private func layoutSellerInfo() {
        self.contentView.addSubview(sellerInfo)
        sellerInfo.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            sellerInfo.leadingAnchor.constraint(equalTo: productImageView.leadingAnchor, constant: 16),
            sellerInfo.trailingAnchor.constraint(equalTo: productImageView.trailingAnchor, constant: -16),
            sellerInfo.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            sellerInfo.heightAnchor.constraint(equalToConstant: 60)
        ])
        sellerInfo.layoutConstraint()
    }
    
    private func layoutStatusButton() {
        self.contentView.addSubview(statusButton)
        statusButton.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            statusButton.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            statusButton.topAnchor.constraint(equalTo: sellerInfo.bottomAnchor, constant: 16)
        ])
    }
    
    private func layoutTitleLabel() {
        self.contentView.addSubview(titleLabel)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            titleLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            titleLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            titleLabel.topAnchor.constraint(equalTo: statusButton.bottomAnchor, constant: 16)
        ])
    }
    
    private func layoutCategoryLabel() {
        self.contentView.addSubview(categoryLabel)
        categoryLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            categoryLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            categoryLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8)
        ])
    }
    
    private func layoutUploadTimeLabel() {
        self.contentView.addSubview(uploadTimeLabel)
        uploadTimeLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            uploadTimeLabel.leadingAnchor.constraint(equalTo: categoryLabel.trailingAnchor, constant: 8),
            uploadTimeLabel.trailingAnchor.constraint(lessThanOrEqualTo: sellerInfo.trailingAnchor),
            uploadTimeLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8)
        ])
    }
    
    private func layoutDescriptionLabel() {
        self.contentView.addSubview(descriptionLabel)
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            descriptionLabel.leadingAnchor.constraint(equalTo: sellerInfo.leadingAnchor),
            descriptionLabel.trailingAnchor.constraint(equalTo: sellerInfo.trailingAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: categoryLabel.bottomAnchor, constant: 16)
        ])
    }
    
    func makeStatusButton() -> UIButton {
        let button = UIButton(type: .system)
        button.setTitle("판매중", for: .normal)
        button.tintColor = .black
        button.layer.borderColor = UIColor.gray.cgColor
        button.layer.borderWidth = 0.2
        
        let onReservation = UIAction(title: "예약중", handler: { _ in return })
        let onSold = UIAction(title: "판매완료", handler: { _ in return })
        
        button.menu = UIMenu(options: .displayInline,
                             children: [onReservation, onSold])
        return button
    }
}
