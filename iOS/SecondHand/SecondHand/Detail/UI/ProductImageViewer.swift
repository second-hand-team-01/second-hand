//
//  ProductImageViewer.swift
//  SecondHand
//
//  Created by Wood on 2023/07/23.
//

import UIKit

class ProductImageViewer: UIView {
    private var imageView = UIImageView()
    private var pageControl = UIPageControl()
    private var productImages: [UIImage] = []
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setActionToPageControl()
        self.pageControl.currentPageIndicatorTintColor = .green
        self.addSubviews()
        self.addConstraints()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func setActionToPageControl() {
        self.pageControl.addAction(
            UIAction(handler: { _ in
                let imageIndex = self.pageControl.currentPage
                self.imageView.image = self.productImages[imageIndex]
            }),
            for: .valueChanged
        )
    }

    private func loadImagesFrom(keys: [NSString?]) -> [UIImage] {
        var images: [UIImage] = []
        keys.forEach { (imageKey: NSString?) in
            guard let key = imageKey else {
                print("키값이 캐시에 존재하지 않습니다.")
                return
            }
            
            guard let productImageURLString = ImageCacheManager.shared.object(forKey: key)?.path else {
                print("이미지에 해당하는 키를 찾지 못했습니다.")
                return
            }

            guard let image = UIImage(contentsOfFile: productImageURLString) else {
                print("키에 해당하는 이미지를 불러오지 못했습니다.")
                return
            }
            images.append(image)
        }
        
        return images
    }
    
    func update(by imageKeys: [NSString?]) {
        self.productImages = self.loadImagesFrom(keys: imageKeys)
        self.pageControl.numberOfPages = self.productImages.count
        self.pageControl.currentPage = 0
        self.imageView.image = self.productImages[0]
    }

    private func addSubviews() {
        let subViews = [
            self.imageView,
            self.pageControl
        ]

        subViews.forEach { (subView: UIView) in
            subView.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview(subView)
        }
    }
    
    private func addConstraints() {
        self.addConstraintsToImageView()
        self.addConstraintsToPageControl()
    }
    
    private func addConstraintsToImageView() {
        let heightRatio: CGFloat = 5 / 4
        NSLayoutConstraint.activate([
            self.imageView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.imageView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.imageView.topAnchor.constraint(equalTo: self.topAnchor),
            self.imageView.heightAnchor.constraint(
                equalTo: self.imageView.widthAnchor,
                multiplier: heightRatio
            )
        ])
    }
    
    private func addConstraintsToPageControl() {
        NSLayoutConstraint.activate([
            self.pageControl.leadingAnchor.constraint(equalTo: self.imageView.leadingAnchor),
            self.pageControl.trailingAnchor.constraint(equalTo: self.imageView.trailingAnchor),
            self.pageControl.topAnchor.constraint(equalTo: self.imageView.bottomAnchor),
            self.pageControl.heightAnchor.constraint(equalToConstant: 30)
        ])
    }
}
