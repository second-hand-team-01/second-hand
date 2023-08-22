//
//  ProductInputView.swift
//  SecondHand
//
//  Created by Wood on 2023/08/11.
//

import UIKit

final class ProductInputView: UIView, UITextViewDelegate {
    private var titleTextField: UITextField = {
        var textField = UITextField()
        textField.placeholder = Content.Placeholder.title
        return textField
    }()
    private var categoryStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.spacing = 4
        return stackView
    }()
    private var categoryListButton: UIButton = {
        var button = UIButton()
        button.setImage(
            UIImage(systemName: Content.ImageName.categoryButton),
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
    private var priceTextField: UITextField = {
       var textField = UITextField()
        textField.placeholder = Content.Placeholder.price
        return textField
    }()
    private var secondBottomLine: UIView = {
        var view = UIView()
        view.backgroundColor = UIColor.lightGray
        return view
    }()
    private var descriptionTextView: UITextView = {
        var textView = UITextView()
        textView.textColor = .lightGray
        textView.text = Content.Placeholder.description
        return textView
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setDelegateToDescriptionTextView()
        self.addSubviews()
        self.addConstraints()
    }
    
    // MARK: - Description TextView
    
    private func setDelegateToDescriptionTextView() {
        self.descriptionTextView.delegate = self
    }
    
    func textViewDidBeginEditing(_ textView: UITextView) {
        textView.text = nil
        textView.textColor = .black
    }

    func textViewDidEndEditing(_ textView: UITextView) {
        if textView.text == nil {
            textView.textColor = .lightGray
            textView.text = Content.Placeholder.description
        }
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
            self.descriptionTextView
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
        self.addConstraintToDescriptionTextView()
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
            self.categoryStackView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.categoryStackView.heightAnchor.constraint(equalToConstant: 32)
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
            self.firstBottomLine.topAnchor.constraint(
                equalTo: self.categoryStackView.bottomAnchor,
                constant: 15
            ),
            self.firstBottomLine.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.firstBottomLine.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.firstBottomLine.heightAnchor.constraint(equalToConstant: 1.0)
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
    
    private func addConstraintToDescriptionTextView() {
        NSLayoutConstraint.activate([
            self.descriptionTextView.topAnchor.constraint(
                equalTo: self.secondBottomLine.bottomAnchor,
                constant: 15
            ),
            self.descriptionTextView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            self.descriptionTextView.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.descriptionTextView.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }
    
    enum Content {
        struct Placeholder {
            static let title = "글 제목"
            static let price = "₩ 가격(선택사항)"
            static let description = "게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
        }
        struct ImageName {
            static let categoryButton = "chevron.right"
        }
    }
}
