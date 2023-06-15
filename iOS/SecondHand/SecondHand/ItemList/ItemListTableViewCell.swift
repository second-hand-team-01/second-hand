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
        var image = UIImageView()
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
        label.textColor = .gray
        return label
    }()
    var commentCountLabel: UILabel = {
        var label = UILabel()
        label.text = "\(String(describing: UIImage(systemName: "message"))) \(1)"
        label.textAlignment = .left
        label.font = .systemFont(ofSize: 13, weight: .regular)
        label.textColor = .gray
        return label
    }()
    var likeCountLabel: UILabel = {
        var label = UILabel()
        label.text = "\(String(describing: UIImage(systemName: "heart"))) \(1)"
        label.textAlignment = .left
        label.font = .systemFont(ofSize: 13, weight: .regular)
        label.textColor = .gray
        return label
    }()
    

    private func configureItemListTableViewCell() {
        self.contentView.backgroundColor = .white
        [
            thumbnailImage,
            titleLabel,
            locationLabel,
            writeTimeLabel,
            stateLabel,
            priceLabel,
            commentCountLabel,
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
        commentCountLabel.translatesAutoresizingMaskIntoConstraints = false
        likeCountLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            thumbnailImage.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 15),
            thumbnailImage.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: 0),
            thumbnailImage.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: 15)
        ])
        
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 19),
            titleLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.leadingAnchor, constant: 15),
            titleLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: 0),
            titleLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
        
        NSLayoutConstraint.activate([
            locationLabel.topAnchor.constraint(equalTo: self.titleLabel.topAnchor, constant: 4),
            locationLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.leadingAnchor, constant: 15),
            locationLabel.heightAnchor.constraint(equalToConstant: 20)
        ])
        
        NSLayoutConstraint.activate([
            writeTimeLabel.topAnchor.constraint(equalTo: self.titleLabel.topAnchor, constant: 19),
            writeTimeLabel.leadingAnchor.constraint(equalTo: self.locationLabel.leadingAnchor, constant: 13),
            writeTimeLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: 0),
            writeTimeLabel.heightAnchor.constraint(equalToConstant: 20)
        ])
        
        NSLayoutConstraint.activate([
            stateLabel.topAnchor.constraint(equalTo: self.locationLabel.topAnchor, constant: 4),
            stateLabel.leadingAnchor.constraint(equalTo: self.thumbnailImage.leadingAnchor, constant: 15),
            stateLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
        
        NSLayoutConstraint.activate([
            priceLabel.topAnchor.constraint(equalTo: self.locationLabel.topAnchor, constant: 4),
            priceLabel.leadingAnchor.constraint(equalTo: self.stateLabel.leadingAnchor, constant: 4),
            priceLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: 0),
            priceLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
        
        
        NSLayoutConstraint.activate([
            likeCountLabel.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -19),
            likeCountLabel.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: 0),
        ])
        
        NSLayoutConstraint.activate([
            commentCountLabel.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -19),
            commentCountLabel.trailingAnchor.constraint(equalTo: self.likeCountLabel.trailingAnchor, constant: 4),
        ])
    }
    
    private func layoutContentView() {
        self.contentView.translatesAutoresizingMaskIntoConstraints = false
        
        guard let superview = self.contentView.superview else {
            return
        }
        
        NSLayoutConstraint.activate([
            self.contentView.topAnchor.constraint(equalTo: superview.topAnchor),
            self.contentView.leadingAnchor.constraint(equalTo: superview.leadingAnchor),
            self.contentView.trailingAnchor.constraint(equalTo: superview.trailingAnchor),
            self.contentView.bottomAnchor.constraint(equalTo: superview.bottomAnchor)
        ])
    }
}
