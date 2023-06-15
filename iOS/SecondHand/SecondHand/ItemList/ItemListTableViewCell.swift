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
        var image = UIImageView(image: UIImage(systemName: "circle"))
        image.backgroundColor = .systemGray
        image.layer.cornerRadius = 8
        image.clipsToBounds = true
        return image
    }()
    var titleLabel: UILabel = {
        var label = UILabel()
        label.text = "제목을 입력하세요"
        label.textAlignment = .left
        label.font = .systemFont(ofSize: 15, weight: .regular)
        return label
    }()
    var locationLabel: UILabel = {
        var label = UILabel()
        label.text = "역삼1동"
        label.textAlignment = .left
        label.font = .systemFont(ofSize: 13, weight: .regular)
        label.textColor = .gray
        return label
    }()
    var writeTimeLabel: UILabel = {
        var label = UILabel()
        label.text = "2시간 전"
        label.textAlignment = .left
        label.font = .systemFont(ofSize: 13, weight: .regular)
        label.textColor = .gray
        return label
    }()
    var stateLabel: CapsuleLabel = CapsuleLabel()
    var priceLabel: UILabel = {
        var label = UILabel()
        label.text = "24,500"
        label.textAlignment = .left
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        return label
    }()
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

    private func configureItemListTableViewCell() {
        self.contentView.backgroundColor = .white
        [
            thumbnailImage,
            titleLabel,
            locationLabel,
            writeTimeLabel,
            stateLabel,
            priceLabel,
            commentSymbolLabel,
            commentCountLabel,
            likeSymbolLabel,
            likeCountLabel
        ].forEach {
            self.contentView.addSubview($0)
        }
    }
    

    private func layoutItemListTableViewCell() {
        thumbnailImage.translatesAutoresizingMaskIntoConstraints = false
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        locationLabel.translatesAutoresizingMaskIntoConstraints = false
        writeTimeLabel.translatesAutoresizingMaskIntoConstraints = false
        stateLabel.translatesAutoresizingMaskIntoConstraints = false
        priceLabel.translatesAutoresizingMaskIntoConstraints = false
        commentSymbolLabel.translatesAutoresizingMaskIntoConstraints = false
        commentCountLabel.translatesAutoresizingMaskIntoConstraints = false
        likeSymbolLabel.translatesAutoresizingMaskIntoConstraints = false
        likeCountLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            thumbnailImage.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 15),
            thumbnailImage.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: 16),
//            thumbnailImage.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: 15),
            thumbnailImage.widthAnchor.constraint(equalToConstant: 120),
            thumbnailImage.heightAnchor.constraint(equalToConstant: 120)
        ])
  
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 19),
            titleLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.trailingAnchor, constant: 15),
            titleLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor),
            titleLabel.heightAnchor.constraint(equalToConstant: 22)
        ])

        NSLayoutConstraint.activate([
            locationLabel.topAnchor.constraint(equalTo: self.titleLabel.bottomAnchor, constant: 4),
            locationLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.trailingAnchor, constant: 15),
            locationLabel.heightAnchor.constraint(equalToConstant: 20)
        ])

        NSLayoutConstraint.activate([
            writeTimeLabel.centerYAnchor.constraint(equalTo: self.locationLabel.centerYAnchor),
            writeTimeLabel.leadingAnchor.constraint(equalTo: self.locationLabel.trailingAnchor, constant: 13),
            writeTimeLabel.heightAnchor.constraint(equalToConstant: 20)
        ])
        
        NSLayoutConstraint.activate([
            stateLabel.topAnchor.constraint(equalTo: self.locationLabel.bottomAnchor, constant: 4),
            stateLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.trailingAnchor, constant: 15),
            stateLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
        
        NSLayoutConstraint.activate([
            priceLabel.topAnchor.constraint(equalTo: self.locationLabel.bottomAnchor, constant: 4),
            priceLabel.leadingAnchor.constraint(equalTo: self.stateLabel.trailingAnchor, constant: 4),
            priceLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
        
        NSLayoutConstraint.activate([
            likeCountLabel.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -21),
            likeCountLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor),
        ])

        NSLayoutConstraint.activate([
            likeSymbolLabel.topAnchor.constraint(equalTo: likeCountLabel.topAnchor),
            likeSymbolLabel.trailingAnchor.constraint(equalTo: self.likeCountLabel.leadingAnchor),
        ])
        
        NSLayoutConstraint.activate([
            commentCountLabel.topAnchor.constraint(equalTo: self.likeCountLabel.topAnchor),
            commentCountLabel.trailingAnchor.constraint(equalTo: self.likeSymbolLabel.leadingAnchor, constant: -4),
        ])
        
        NSLayoutConstraint.activate([
            commentSymbolLabel.topAnchor.constraint(equalTo: self.likeCountLabel.topAnchor),
            commentSymbolLabel.trailingAnchor.constraint(equalTo: self.commentCountLabel.leadingAnchor),
        ])
    }
}
