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
    var productInfo = ProductInfo()
    var communicationInfo = CommunicationInfo()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        statusButton = makeStatusButton()
        setUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        layoutConstraint()
    }

    func configure() {
        productImageView.image = UIImage(systemName: "carrot.fill")
        sellerInfo.configure(nameLabel: "Wood")
        
        let productName = "빈티지 롤러 스케이트"
        let annotation = "가구/인테리어 ・ 1분전"
        let description = """
            어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다\n
            촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다.
            새 제품으로 보존된 제품으로 전용박스까지 보내드립니다.\n
            사이즈는 235 입니다.\n fdjkgnsdfjkngsdfjknsgfkjnadfsgjnk
        """
        productInfo.configure(name: productName,
                              annotation: annotation,
                              description: description)
        
        communicationInfo.configure(chatCount: 0,
                                    favoriteCount: 0,
                                    viewsCount: 1)
    }
    
    private func setUI() {
        productImageView.tintColor = .orange
        statusButton = makeStatusButton()
    }
    
    private func makeStatusButton() -> UIButton {
        let button = UIButton(type: .system)
        
        button.setTitle("판매중", for: .normal)
        button.setImage(UIImage(systemName: "chevron.down"), for: .normal)
        button.titleLabel?.font = Typography.caption1
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
