//
//  timeLabel.swift
//  SecondHand
//
//  Created by apple on 2023/06/15.
//

import UIKit

class TimeLabel: UILabel {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.configureLabel()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    private func configureLabel() {
        self.textAlignment = .left
        self.font = .systemFont(ofSize: 13, weight: .regular)
        self.textColor = .gray
    }
    
    func updateText(to writeDate: Date) {
        let timeInterval: TimeInterval = Date().timeIntervalSince(writeDate)
        
        if timeInterval < 60 {
            self.text = "방금 전"
        } else if timeInterval < 3600 {
            let minutes = Int(timeInterval / 60)
            self.text = "\(minutes)분 전"
        } else if timeInterval < 86400 {
            let hours = Int(timeInterval / 3600)
            self.text = "\(hours)시간 전"
        } else {
            let days = Int(timeInterval / 86400)
            self.text = "\(days)일 전"
        }
    }
}
