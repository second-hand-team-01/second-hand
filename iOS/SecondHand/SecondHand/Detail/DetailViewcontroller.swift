//
//  DetailViewcontroller.swift
//  SecondHand
//
//  Created by Wood on 2023/06/11.
//

import UIKit

class DetailViewController: UIViewController {
    var productImages = UIImageView()
    var pageControl = UIPageControl()
    var sellerInfo = SellerInfo()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        sellerInfo.layer.cornerRadius = sellerInfo.frame.height / 2
        productImages.backgroundColor = .green
        pageControl.backgroundColor = .black
        pageControl.backgroundColor = .yellow
        sellerInfo.backgroundColor = .gray
        sellerInfo.configure(name: "Woodasdfasdfsafasdfasdfasdfasdfasdfasdf")
        layoutConstraint()
    }
    
    private func layoutConstraint() {
        // 1. 상품 이미지 Constraint 설정
        self.view.addSubview(productImages)
        productImages.translatesAutoresizingMaskIntoConstraints = false

        let safeArea = self.view.safeAreaLayoutGuide
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            productImages.leadingAnchor.constraint(equalTo: safeArea.leadingAnchor),
            productImages.trailingAnchor.constraint(equalTo: safeArea.trailingAnchor),
            productImages.topAnchor.constraint(equalTo: self.view.topAnchor),
            productImages.heightAnchor.constraint(equalTo: productImages.widthAnchor,
                                              multiplier: heightRatio)
        ])

        // 2. 페이지 컨트롤 Constraint 설정
        self.view.addSubview(pageControl)
        pageControl.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            pageControl.leadingAnchor.constraint(equalTo: self.productImages.leadingAnchor),
            pageControl.trailingAnchor.constraint(equalTo: self.productImages.trailingAnchor),
            pageControl.bottomAnchor.constraint(equalTo: productImages.bottomAnchor),
            pageControl.heightAnchor.constraint(equalToConstant: 20)
        ])

        // 3. 판매자 정보 Constraint 설정
        self.view.addSubview(sellerInfo)
        sellerInfo.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            sellerInfo.leadingAnchor.constraint(equalTo: productImages.leadingAnchor, constant: 16),
            sellerInfo.trailingAnchor.constraint(equalTo: productImages.trailingAnchor, constant: -16),
            sellerInfo.topAnchor.constraint(equalTo: self.pageControl.bottomAnchor, constant: 16),
            sellerInfo.heightAnchor.constraint(equalToConstant: 60)
        ])
        sellerInfo.layoutConstraint()
    }
}
