//
//  CommentLabel.swift
//  SecondHand
//
//  Created by Wood on 2023/08/25.
//

import UIKit

final class InterestCountLabel: UILabel {
    private var attachmentString: NSAttributedString = {
        let imageAttachment = NSTextAttachment()
        let image = UIImage(systemName: "heart")
        imageAttachment.image = image
        return NSAttributedString(attachment: imageAttachment)
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.setUI()
    }
    
    private func setUI() {
        self.textAlignment = .center
        self.font = .typo.footNote
    }
    
    func updateText(interestCount: String) {
        var attributedString = NSMutableAttributedString(string: "")
        attributedString.append(self.attachmentString)
        
        let textAfterIcon = NSAttributedString(string: interestCount)
        attributedString.append(textAfterIcon)
        
        self.attributedText = attributedString
    }
}
