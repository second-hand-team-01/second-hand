//
//  DetailViewcontroller.swift
//  SecondHand
//
//  Created by Wood on 2023/06/11.
//

import UIKit

class DetailViewController: UIViewController {
    var productImageView = UIImageView()
    var pageControl = UIPageControl()
    var sellerInfo = SellerInfo()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUI()
        sellerInfo.configure(name: "Woodasdfasdfsafasdfasdfasdfasdfasdfasdf")
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
    }
    
    private func layoutConstraint() {
        layoutProductImageView()
        layoutPageControl()
        layoutSellerInfo()
    }
    
    private func layoutProductImageView() {
        self.view.addSubview(productImageView)
        productImageView.translatesAutoresizingMaskIntoConstraints = false
        let safeArea = self.view.safeAreaLayoutGuide
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            productImageView.leadingAnchor.constraint(equalTo: safeArea.leadingAnchor),
            productImageView.trailingAnchor.constraint(equalTo: safeArea.trailingAnchor),
            productImageView.topAnchor.constraint(equalTo: self.view.topAnchor),
            productImageView.heightAnchor.constraint(equalTo: productImageView.widthAnchor,
                                                     multiplier: heightRatio)
        ])
    }
    
    private func layoutPageControl() {
        self.view.addSubview(pageControl)
        pageControl.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            pageControl.leadingAnchor.constraint(equalTo: self.productImageView.leadingAnchor),
            pageControl.trailingAnchor.constraint(equalTo: self.productImageView.trailingAnchor),
            pageControl.bottomAnchor.constraint(equalTo: productImageView.bottomAnchor),
            pageControl.heightAnchor.constraint(equalToConstant: 20)
        ])
    }
    
    private func layoutSellerInfo() {
        self.view.addSubview(sellerInfo)
        sellerInfo.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            sellerInfo.leadingAnchor.constraint(equalTo: productImageView.leadingAnchor, constant: 16),
            sellerInfo.trailingAnchor.constraint(equalTo: productImageView.trailingAnchor, constant: -16),
            sellerInfo.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            sellerInfo.heightAnchor.constraint(equalToConstant: 60)
        ])
        sellerInfo.layoutConstraint()
    }
}
