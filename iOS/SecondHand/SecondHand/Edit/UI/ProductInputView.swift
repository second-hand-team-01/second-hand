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
    private var firstCategoryButton = CategoryButtonFactory.make()
    private var secondCategoryButton = CategoryButtonFactory.make()
    private var thirdCategoryButton = CategoryButtonFactory.make()
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
        textView.font = .systemFont(ofSize: 17)
        textView.text = Content.Placeholder.description
        return textView
    }()
    var categoryListButtonTapSender: ((Bool) -> ())?

    func update(detailToEdit: EditModel) {
        self.descriptionTextView.textColor = .black
        DispatchQueue.main.async {
            self.titleTextField.text = "\(detailToEdit.name)"
            self.priceTextField.text = "\(detailToEdit.price)"
            self.descriptionTextView.text = "\(detailToEdit.description)"
        }
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
    
    private func addActionToCategoryListButton() {
        let action = UIAction { _ in
            self.categoryListButtonTapSender?(true)
        }
        self.categoryListButton.addAction(action, for: .touchUpInside)
    }

    func getEnteredProductInfo() -> [String?] {
        let title = self.titleTextField.text == ""            ? nil : self.titleTextField.text
        let price = self.priceTextField.text == ""            ? nil : self.priceTextField.text
        let description = self.descriptionTextView.text == "" ? nil : self.descriptionTextView.text
        return [title, price, description]
    }

    private func showRandomCateogrys() {
        let title1 = Content.Category.title1
        self.firstCategoryButton.setAttributedTitle(title1, for: .normal)
        let title2 = Content.Category.title2
        self.secondCategoryButton.setAttributedTitle(title2, for: .normal)
        let title3 = Content.Category.title3
        self.thirdCategoryButton.setAttributedTitle(title3, for: .normal)
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setDelegateToDescriptionTextView()
        self.addActionToCategoryListButton()
        self.showRandomCateogrys()
        self.addSubviews()
        self.addConstraints()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func addSubviews() {
        let subViews = [
            self.titleTextField,
            self.firstCategoryButton,
            self.secondCategoryButton,
            self.thirdCategoryButton,
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
        self.addConstraintToFirstCategoryButton()
        self.addConstraintToSecondCategoryButton()
        self.addConstraintToThirdCategoryButton()
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
    
    private func addConstraintToFirstCategoryButton() {
        NSLayoutConstraint.activate([
            self.firstCategoryButton.topAnchor.constraint(
                equalTo: self.titleTextField.bottomAnchor,
                constant: 8
            ),
            self.firstCategoryButton.leadingAnchor.constraint(equalTo: self.titleTextField.leadingAnchor)
        ])
    }
    
    private func addConstraintToSecondCategoryButton() {
        NSLayoutConstraint.activate([
            self.secondCategoryButton.topAnchor.constraint(equalTo: self.firstCategoryButton.topAnchor),
            self.secondCategoryButton.leadingAnchor.constraint(
                equalTo: self.firstCategoryButton.trailingAnchor,
                constant: 4
            )
        ])
    }
    
    private func addConstraintToThirdCategoryButton() {
        NSLayoutConstraint.activate([
            self.thirdCategoryButton.topAnchor.constraint(equalTo: self.firstCategoryButton.topAnchor),
            self.thirdCategoryButton.leadingAnchor.constraint(
                equalTo: self.secondCategoryButton.trailingAnchor,
                constant: 4
            )
        ])
    }
    
    private func addConstraintToCategoryListButton() {
        NSLayoutConstraint.activate([
            self.categoryListButton.topAnchor.constraint(equalTo: self.firstCategoryButton.topAnchor),
            self.categoryListButton.leadingAnchor.constraint(greaterThanOrEqualTo: self.thirdCategoryButton.trailingAnchor),
            self.categoryListButton.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            self.categoryListButton.bottomAnchor.constraint(equalTo: self.firstCategoryButton.bottomAnchor),
            self.categoryListButton.widthAnchor.constraint(equalToConstant: 11)
        ])
    }
    
    private func addConstraintToFirstBottomLine() {
        NSLayoutConstraint.activate([
            self.firstBottomLine.topAnchor.constraint(
                equalTo: self.firstCategoryButton.bottomAnchor,
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
        struct Category {
            static let title1 = NSAttributedString(
                string: "여성패션",
                attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 13)]
            )
            static let title2 = NSAttributedString(
                string: "여성잡화",
                attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 13)]
            )
            static let title3 = NSAttributedString(
                string: "기타중고물품",
                attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 13)]
            )
        }
    }
}
