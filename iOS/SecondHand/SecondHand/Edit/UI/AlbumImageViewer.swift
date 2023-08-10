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
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubviews()
        self.addConstraints()
        self.addImages()
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
    
    private func addImages() {
        for _ in 0..<9 {
            let imageView = UIImageView(image: UIImage(systemName: "carrot"))
            imageView.tintColor = .orange
            imageView.layer.borderWidth = 0.5
            imageView.layer.cornerRadius = 15
            imageView.translatesAutoresizingMaskIntoConstraints = false
            self.imageStackView.addArrangedSubview(imageView)
            imageView.widthAnchor.constraint(equalToConstant: 80).isActive = true
            imageView.heightAnchor.constraint(equalTo: imageView.widthAnchor).isActive = true
        }
    }
    
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
            self.imageStackView.topAnchor.constraint(
                equalTo: self.scrollView.topAnchor,
                constant: 15
            ),
            self.imageStackView.leadingAnchor.constraint(equalTo: self.scrollView.leadingAnchor),
            self.imageStackView.trailingAnchor.constraint(equalTo: self.scrollView.trailingAnchor),
            self.imageStackView.bottomAnchor.constraint(
                equalTo: self.scrollView.bottomAnchor,
                constant: -15
            ),
            self.imageStackView.heightAnchor.constraint(
                equalTo: self.scrollView.heightAnchor,
                multiplier: 1,
                constant: -30
            )
        ])
    }
}
