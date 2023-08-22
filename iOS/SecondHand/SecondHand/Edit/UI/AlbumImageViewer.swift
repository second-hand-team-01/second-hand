//
//  ImageUploadView.swift
//  SecondHand
//
//  Created by Wood on 2023/08/08.
//

import PhotosUI

final class AlbumImageViewer: UIView {
    private var scrollView: UIScrollView = {
        var scrolllView = UIScrollView()
        scrolllView.showsVerticalScrollIndicator = false
        scrolllView.showsHorizontalScrollIndicator = false
        return scrolllView
    }()
    private var imageStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.spacing = 14
        return stackView
    }()
    var images: [UIImage] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubviews()
        self.addConstraints()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    private func addSubviews() {
        self.scrollView.translatesAutoresizingMaskIntoConstraints = false
        self.addSubview(self.scrollView)

        self.imageStackView.translatesAutoresizingMaskIntoConstraints = false
        self.scrollView.addSubview(imageStackView)
    }
    
    func add(image: UIImage) {
        self.images.append(image)
        
        DispatchQueue.main.async {
            let imageView = UIImageView(image: image)
            imageView.tintColor = .black
            imageView.layer.borderWidth = 0.5
            imageView.layer.cornerRadius = 15
            imageView.clipsToBounds = true
            imageView.translatesAutoresizingMaskIntoConstraints = false
            imageView.widthAnchor.constraint(equalToConstant: 80).isActive = true
            imageView.heightAnchor.constraint(equalTo: imageView.widthAnchor).isActive = true
            
            self.imageStackView.addArrangedSubview(imageView)
        }
    }
    
    func loadImagesFrom(keys: [NSString?]) {
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
        
            DispatchQueue.main.async {
                self.add(image: image)
            }
        }
    }
    
    func getCountOfImages() -> Int {
        return self.images.count
    }
    
    // MARK: - AutoLayout 설정
    
    private func addConstraints() {
        self.addConstraintToImageStackView()
        self.addConstraintToScrollView()
    }
    
    private func addConstraintToScrollView() {
        NSLayoutConstraint.activate([
            self.scrollView.topAnchor.constraint(equalTo: self.topAnchor),
            self.scrollView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.scrollView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.scrollView.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
    
    private func addConstraintToImageStackView() {
        NSLayoutConstraint.activate([
            self.imageStackView.topAnchor.constraint(equalTo: self.scrollView.topAnchor),
            self.imageStackView.leadingAnchor.constraint(equalTo: self.scrollView.leadingAnchor),
            self.imageStackView.trailingAnchor.constraint(equalTo: self.scrollView.trailingAnchor),
            self.imageStackView.bottomAnchor.constraint(equalTo: self.scrollView.bottomAnchor),
            self.imageStackView.heightAnchor.constraint(
                equalTo: self.scrollView.heightAnchor,
                multiplier: 1
            )
        ])
    }
}
