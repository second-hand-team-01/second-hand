//
//  ItemListTableViewCell.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

class ItemListTableViewCell: UITableViewCell {
    static let identifier = "ItemListCell"
    
    var thumbnailImage: UIImageView = {
        var image = UIImageView(image: UIImage(systemName: "carrot"))
        image.backgroundColor = .systemGray
        image.layer.cornerRadius = 8
        image.clipsToBounds = true
        return image
    }()
    var titleLabel = TitleLabel()
    var locationLabel = LocationLabel()
    var writeTimeLabel = TimeLabel()
    var stateLabel = CapsuleLabel()
    var priceLabel = PriceLabel()
    var commentSymbolLabel: UIImageView = {
        var image = UIImageView(image: UIImage(systemName: "message"))
        return image
    }()
    var commentCountLabel: UILabel = {
        var label = UILabel()
        label.text = "\(1)"
        label.font = .systemFont(ofSize: 13, weight: .regular)
        return label
    }()
    var likeSymbolLabel: UIImageView = {
        var image = UIImageView(image: UIImage(systemName: "heart"))
        return image
    }()
    var likeCountLabel: UILabel = {
        var label = UILabel()
        label.text = "\(5)"
        label.font = .systemFont(ofSize: 13, weight: .regular)
        return label
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.configureItemListTableViewCell()
        self.layoutItemListTableViewCell()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func updateThumbnail(imageKey: ImageKey) {
        guard let thumbnailImageURLString = ImageCacheManager.sharedForItemList.object(forKey: imageKey)?.path else {
            print("키에 해당하는 이미지를 찾지 못했습니다.")
            return
        }
        
        guard let image = UIImage(contentsOfFile: thumbnailImageURLString) else {
            print("이미지를 불러오는데 실패했습니다.")
            return
        }
        
        self.thumbnailImage.image = image
    }
    
    func update(itemViewModel: ItemViewModel) {
        let imageKey = itemViewModel.imageKey
        let title = itemViewModel.title
        let location = itemViewModel.location
        let passedTime = itemViewModel.passedTime
        let price = itemViewModel.price
        let chatCount = itemViewModel.chatCount
        let interestCount = itemViewModel.interestCount
        
        DispatchQueue.main.async {
            self.updateThumbnail(imageKey: imageKey)
            self.titleLabel.updateText(to: title)
            self.locationLabel.updateText(to: location)
            self.writeTimeLabel.updateText(to: passedTime)
            self.priceLabel.updateText(to: price)
            self.commentCountLabel.text = chatCount
            self.likeCountLabel.text = interestCount
        }
    }

    private func configureItemListTableViewCell() {
        self.contentView.backgroundColor = .white
        [
            self.thumbnailImage,
            self.titleLabel,
            self.locationLabel,
            self.writeTimeLabel,
            self.stateLabel,
            self.priceLabel,
            self.commentSymbolLabel,
            self.commentCountLabel,
            self.likeSymbolLabel,
            self.likeCountLabel
        ].forEach {
            self.contentView.addSubview($0)
        }
    }
    
    private func layoutItemListTableViewCell() {
        self.layoutTitleLabel()
        self.layoutLocationLabel()
        self.layoutWriteTimeLabel()
        self.layoutStateLabel()
        self.layoutPriceLabel()
        self.layoutThumbnailImage()
        self.layoutTrailingLabel()
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
    
    private func layoutStateLabel() {
        stateLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            stateLabel.topAnchor.constraint(equalTo: self.locationLabel.bottomAnchor, constant: 4),
            stateLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.trailingAnchor, constant: 15),
            stateLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
    }
    
    private func layoutPriceLabel() {
        priceLabel.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            priceLabel.topAnchor.constraint(equalTo: self.locationLabel.bottomAnchor, constant: 4),
            priceLabel.leadingAnchor.constraint(equalTo: self.stateLabel.trailingAnchor, constant: 4),
            priceLabel.heightAnchor.constraint(equalToConstant: 22)
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
    
    private func layoutTrailingLabel() {
        commentSymbolLabel.translatesAutoresizingMaskIntoConstraints = false
        commentCountLabel.translatesAutoresizingMaskIntoConstraints = false
        likeSymbolLabel.translatesAutoresizingMaskIntoConstraints = false
        likeCountLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            likeCountLabel.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -21),
            likeCountLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -16)
        ])

        NSLayoutConstraint.activate([
            likeSymbolLabel.topAnchor.constraint(equalTo: likeCountLabel.topAnchor),
            likeSymbolLabel.trailingAnchor.constraint(equalTo: self.likeCountLabel.leadingAnchor)
        ])
        
        NSLayoutConstraint.activate([
            commentCountLabel.topAnchor.constraint(equalTo: self.likeCountLabel.topAnchor),
            commentCountLabel.trailingAnchor.constraint(equalTo: self.likeSymbolLabel.leadingAnchor, constant: -4)
        ])
        
        NSLayoutConstraint.activate([
            commentSymbolLabel.topAnchor.constraint(equalTo: self.likeCountLabel.topAnchor),
            commentSymbolLabel.trailingAnchor.constraint(equalTo: self.commentCountLabel.leadingAnchor)
        ])
    }
}
