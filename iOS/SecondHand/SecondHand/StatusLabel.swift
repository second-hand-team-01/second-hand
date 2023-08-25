//
//  StatusLabel.swift
//  SecondHand
//
//  Created by Wood on 2023/08/25.
//

import UIKit

final class StatusLabel: UILabel {
    enum Status: String {
        case forSale        = ""
        case onReservation  = "예약중"
        case sold           = "판매완료"
        
        init?(rawValue: String) {
            switch rawValue {
            case Status.forSale.rawValue:
                self = .forSale
            case Status.onReservation.rawValue:
                self = .onReservation
            case Status.sold.rawValue:
                self = .sold
            default:
                return nil
            }
        }
    }
    
    private var status: Status
    private let padding = UIEdgeInsets(
        top: 4,
        left: 8,
        bottom: 4,
        right: 8
    )
    
    override var intrinsicContentSize: CGSize {
        var contentSize = super.intrinsicContentSize
        contentSize.width += padding.left + padding.right
        contentSize.height += padding.top + padding.bottom
        return contentSize
    }
    
    override func drawText(in rect: CGRect) {
        super.drawText(in: rect.inset(by: padding))
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = 8
        layer.masksToBounds = true
    }
    
    private func setUI() {
        self.backgroundColor = ColorValue.mint
        self.layer.cornerRadius = 8
        self.textColor = .white
        self.font = .typo.caption1
    }
    
    override init(frame: CGRect) {
        self.status = .forSale
        super.init(frame: frame)
        self.setUI()
    }
    
    required init?(coder: NSCoder) {
        self.status = .forSale
        super.init(coder: coder)
        self.setUI()
    }
    
    func change(to status: Status) {
        self.text = status.rawValue
        switch status {
        case .forSale:
            self.isHidden = true
        default:
            self.isHidden = false
        }
    }
}
