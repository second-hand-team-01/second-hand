//
//  DetailContentView.swift
//  Pods
//
//  Created by Wood on 2023/06/14.
//

import UIKit

class DetailConetntView: UIView {
    var productImageView = UIImageView()
    var pageControl = UIPageControl()
    var sellerInfo = SellerInfo()
    var statusButton = UIButton()
    var titleLabel = UILabel()
    var categoryLabel = UILabel()
    var uploadTimeLabel = UILabel()
    var descriptionLabel = UILabel()
    var chatLabel = UILabel()
    var chatCountLabel = UILabel()
    var favoriteLabel = UILabel()
    var favoriteCountLabel = UILabel()
    var viewsLabel = UILabel()
    var viewsCountLabel = UILabel()
    
    override func layoutSubviews() {
        super.layoutSubviews()
        addSubviews()
        layoutConstraint()
        setUI()
        statusButton = makeStatusButton()
    }
    
    func configure() {
        titleLabel.text = "빈티지 롤러 스케이트"
        categoryLabel.text = "가구/인테리어"
        uploadTimeLabel.text = "1분전"
        descriptionLabel.numberOfLines = 0
        descriptionLabel.text = "어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다\n촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다. 새 제품으로 보존된 제품으로 전용박스까지 보내드립니다.\n 사이즈는 235 입니다.\n fdjkgnsdfjkngsdfjknsgfkjnadfsgjnk"
        sellerInfo.configure(name: "Wood")
        chatLabel.text = "채팅"
        chatCountLabel.text = "0"
        favoriteLabel.text = "관심"
        favoriteCountLabel.text = "0"
        viewsLabel.text = "조회"
        viewsCountLabel.text = "1"
    }
    
    private func setUI() {
        sellerInfo.layer.cornerRadius = sellerInfo.frame.height / 2
        productImageView.backgroundColor = .green
        pageControl.backgroundColor = .yellow
        sellerInfo.backgroundColor = .gray
        statusButton = makeStatusButton()
    }
    
    private func makeStatusButton() -> UIButton {
        let button = UIButton(type: .system)
        button.setTitle("판매중", for: .normal)
        button.setImage(UIImage(systemName: "chevron.down"), for: .normal)
        button.semanticContentAttribute = .forceRightToLeft
        button.tintColor = .black
        button.layer.borderColor = UIColor.gray.cgColor
        button.layer.borderWidth = 0.2
        
        let onReservation = UIAction(title: "예약중", handler: { _ in return })
        let onSold = UIAction(title: "판매완료", handler: { _ in return })
        
        button.menu = UIMenu(options: .displayInline,
                             children: [onReservation, onSold])
        return button
    }
}
