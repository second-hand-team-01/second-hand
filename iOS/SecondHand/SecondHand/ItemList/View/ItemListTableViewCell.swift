//
//  ItemListTableViewCell.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

class ItemListTableViewCell: UITableViewCell {
    static let identifier = "ItemListCell"
    
    private var thumbnailImage: UIImageView = {
        var image = UIImageView(image: UIImage(systemName: "carrot"))
        image.backgroundColor = .systemGray
        image.layer.cornerRadius = 8
        image.clipsToBounds = true
        return image
    }()
    private var titleLabel = TitleLabel()
    private var locationLabel = LocationLabel()
    private var writeTimeLabel = TimeLabel()
    private var statusAndPriceStackView: UIStackView = {
        var stackView = UIStackView()
        stackView.spacing = 4
        return stackView
    }()
    private var statusLabel = StatusLabel()
    private var priceLabel = PriceLabel()
    private var chatCountLabel = ChatCountLabel()
    private var interestCountLabel = InterestCountLabel()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.configureItemListTableViewCell()
        self.layoutItemListTableViewCell()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        self.clearUIForReuse()
    }
    
    private func clearUIForReuse() {
        self.thumbnailImage.image = nil
        self.titleLabel.updateText(to: "")
        self.locationLabel.updateText(to: "")
        self.writeTimeLabel.updateText(to: "")
        self.statusLabel.change(to: .forSale)
        self.priceLabel.updateText(to: 0)
        self.chatCountLabel.updateText(chatCount: "")
        self.interestCountLabel.updateText(interestCount: "")
    }
    
    private func updateThumbnail(imageKey: ImageKey) {
        guard let thumbnailImageURLString = ImageCacheManager.sharedForItemList.object(forKey: imageKey)?.path else {
            print("키에 해당하는 이미지를 찾지 못했습니다.")
            return
        }
        
        if let image = UIImage(contentsOfFile: thumbnailImageURLString) {

            self.thumbnailImage.image = image
        } else {
            print("이미지를 불러오는데 실패했습니다.")
            self.thumbnailImage.image = UIImage(systemName: "carrot")
        }
        
    }
    
    func update(itemViewModel: ItemViewModel) {
        let imageKey = itemViewModel.imageKey
        let title = itemViewModel.title
        let location = itemViewModel.location
        let passedTime = itemViewModel.passedTime
        let status = itemViewModel.status
        let price = itemViewModel.price
        let chatCount = itemViewModel.chatCount
        let interestCount = itemViewModel.interestCount
        
        DispatchQueue.main.async {
            self.updateThumbnail(imageKey: imageKey)
            self.titleLabel.updateText(to: title)
            self.locationLabel.updateText(to: location)
            self.writeTimeLabel.updateText(to: passedTime)
            self.statusLabel.change(to: status)
            self.priceLabel.updateText(to: price)
            self.chatCountLabel.updateText(chatCount: chatCount)
            self.interestCountLabel.updateText(interestCount: interestCount)
        }
    }

    private func configureItemListTableViewCell() {
        self.contentView.backgroundColor = .white
        [
            self.thumbnailImage,
            self.titleLabel,
            self.locationLabel,
            self.writeTimeLabel,
            self.statusAndPriceStackView,
            self.chatCountLabel,
            self.interestCountLabel
        ].forEach {
            self.contentView.addSubview($0)
        }
    }
    
    private func layoutItemListTableViewCell() {
        self.layoutTitleLabel()
        self.layoutLocationLabel()
        self.layoutWriteTimeLabel()
        self.addConstraintToStatusAndPriceStackView()
        self.addConstraintToInterestLabel()
        self.addConstraintToCommentLabel()
        self.layoutThumbnailImage()
    }
    
    private func layoutTitleLabel() {
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 19),
            titleLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.trailingAnchor, constant: 15),
            titleLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor),
            titleLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
    }
    
    private func layoutLocationLabel() {
        locationLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            locationLabel.topAnchor.constraint(equalTo: self.titleLabel.bottomAnchor, constant: 4),
            locationLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.trailingAnchor, constant: 15),
            locationLabel.heightAnchor.constraint(equalToConstant: 20)
        ])
    }
    
    private func layoutWriteTimeLabel() {
        writeTimeLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            writeTimeLabel.centerYAnchor.constraint(equalTo: self.locationLabel.centerYAnchor),
            writeTimeLabel.leadingAnchor.constraint(equalTo: self.locationLabel.trailingAnchor, constant: 13),
            writeTimeLabel.heightAnchor.constraint(equalToConstant: 20)
        ])
    }
    
    private func addConstraintToStatusAndPriceStackView() {
        self.statusAndPriceStackView.translatesAutoresizingMaskIntoConstraints = false
        self.statusAndPriceStackView.addArrangedSubview(self.statusLabel)
        self.statusAndPriceStackView.addArrangedSubview(self.priceLabel)
        
        NSLayoutConstraint.activate([
            self.statusAndPriceStackView.topAnchor.constraint(
                equalTo: self.locationLabel.bottomAnchor,
                constant: 4
            ),
            self.statusAndPriceStackView.leadingAnchor.constraint(equalTo: self.locationLabel.leadingAnchor),
            self.statusAndPriceStackView.heightAnchor.constraint(equalToConstant: 22)
        ])
    }
    
    private func layoutThumbnailImage() {
        thumbnailImage.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            thumbnailImage.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 15),
            thumbnailImage.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: 16),
            thumbnailImage.widthAnchor.constraint(equalToConstant: 120),
            thumbnailImage.heightAnchor.constraint(equalToConstant: 120)
        ])
    }
    
    private func addConstraintToInterestLabel() {
        self.interestCountLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.interestCountLabel.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -21),
            self.interestCountLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -16)
        ])
    }

    private func addConstraintToCommentLabel() {
        self.chatCountLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.chatCountLabel.centerYAnchor.constraint(equalTo: self.interestCountLabel.centerYAnchor),
            self.chatCountLabel.trailingAnchor.constraint(
                equalTo: self.interestCountLabel.leadingAnchor,
                constant: -4
            )
        ])
    }
}
