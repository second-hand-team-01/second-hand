//
//  ProductInputView.swift
//  SecondHand
//
//  Created by Wood on 2023/08/11.
//

import UIKit

final class ProductInputView: UIView {
    private var titleTextField = UITextField()
    private var categoryStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.spacing = 4
        return stackView
    }()
    private var categoryListButton: UIButton = {
        var button = UIButton()
        button.setImage(
            UIImage(systemName: "chevron.right"),
            for: .normal
        )
        button.tintColor = .black
        return button
    }()
    private var firstBottomLine: UIView = {
        var view = UIView()
        view.backgroundColor = UIColor.lightGray
        return view
    }()
    private var priceTextField = UITextField()
    private var secondBottomLine: UIView = {
        var view = UIView()
        view.backgroundColor = UIColor.lightGray
        return view
    }()
    private var descriptionTextField = UITextField()

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubviews()
        self.addConstraints()
        self.titleTextField.text = "123"
        self.priceTextField.text = "100,000"
        self.descriptionTextField.text = "판매중이다"
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func addSubviews() {
        let subViews = [
            self.titleTextField,
            self.categoryStackView,
            self.categoryListButton,
            self.firstBottomLine,
            self.priceTextField,
            self.secondBottomLine,
            self.descriptionTextField
        ]

        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.addSubview($0)
        }
    }
    
    // MARK: - Auto Layout 설정
    private func addConstraints() {
        self.addConstraintToTitleTextField()
        self.addConstraintToCategoryStackView()
        self.addConstraintToCategoryListButton()
        self.addConstraintToFirstBottomLine()
        self.addConstraintToPriceTextField()
        self.addConstraintToSecndBottomLine()
        self.addConstraintToDescriptionTextField()
    }
    
    private func addConstraintToTitleTextField() {
        NSLayoutConstraint.activate([
            self.titleTextField.topAnchor.constraint(equalTo: self.topAnchor),
            self.titleTextField.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.titleTextField.trailingAnchor.constraint(equalTo: self.trailingAnchor)
        ])
    }
    
    private func addConstraintToCategoryStackView() {
        NSLayoutConstraint.activate([
            self.categoryStackView.topAnchor.constraint(
                equalTo: self.titleTextField.bottomAnchor,
                constant: 8
            ),
            self.categoryStackView.leadingAnchor.constraint(
                equalTo: self.leadingAnchor)
        ])
    }
    
    private func addConstraintToCategoryListButton() {
        NSLayoutConstraint.activate([
            self.categoryListButton.topAnchor.constraint(equalTo: self.categoryStackView.topAnchor),
            self.categoryListButton.leadingAnchor.constraint(greaterThanOrEqualTo: self.categoryStackView.trailingAnchor),
            self.categoryListButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.categoryListButton.bottomAnchor.constraint(equalTo: self.categoryStackView.bottomAnchor),
            self.categoryListButton.widthAnchor.constraint(equalToConstant: 11),
            self.categoryListButton.heightAnchor.constraint(
                equalTo: self.categoryListButton.widthAnchor,
                multiplier: 2.0
            )
        ])
    }
    
    private func addConstraintToFirstBottomLine() {
        NSLayoutConstraint.activate([
            firstBottomLine.topAnchor.constraint(
                equalTo: self.categoryStackView.bottomAnchor,
                constant: 15
            ),
            firstBottomLine.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            firstBottomLine.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            firstBottomLine.heightAnchor.constraint(equalToConstant: 1.0)
        ])
    }
    
    private func addConstraintToPriceTextField() {
        NSLayoutConstraint.activate([
            self.priceTextField.topAnchor.constraint(
                equalTo: self.firstBottomLine.bottomAnchor,
                constant: 15
            ),
            self.priceTextField.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.priceTextField.trailingAnchor.constraint(equalTo: self.trailingAnchor)
        ])
    }
    
    private func addConstraintToSecndBottomLine() {
        NSLayoutConstraint.activate([
            self.secondBottomLine.topAnchor.constraint(
                equalTo: self.priceTextField.bottomAnchor,
                constant: 15
            ),
            self.secondBottomLine.leadingAnchor.constraint(equalTo: self.priceTextField.leadingAnchor),
            self.secondBottomLine.trailingAnchor.constraint(equalTo: self.priceTextField.trailingAnchor),
            self.secondBottomLine.heightAnchor.constraint(equalToConstant: 1.0)
        ])
    }
    
    private func addConstraintToDescriptionTextField() {
        NSLayoutConstraint.activate([
            self.descriptionTextField.topAnchor.constraint(
                equalTo: self.secondBottomLine.bottomAnchor,
                constant: 15
            ),
            self.descriptionTextField.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.descriptionTextField.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.descriptionTextField.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
}
