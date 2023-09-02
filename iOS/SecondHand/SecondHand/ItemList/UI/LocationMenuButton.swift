//
//  LocationMenuButton.swift
//  SecondHand
//
//  Created by Wood on 2023/09/02.
//

import UIKit

final class LocationMenuButton: UIBarButtonItem {
    private var button: UIButton = {
        let button = UIButton(type: .system)
        button.titleLabel?.font = .typo.headLine
        button.titleLabel?.adjustsFontForContentSizeCategory = true
        button.translatesAutoresizingMaskIntoConstraints = false
        button.contentVerticalAlignment = .center
        button.contentHorizontalAlignment = .leading
        button.semanticContentAttribute = .forceRightToLeft
        button.setTitle("역삼1동", for: .normal)
        button.setImage(Components.buttonImage, for: .normal)
        return button
    }()
    private var mainAction = UIAction { _ in }
    private var subAction = UIAction { _ in }
    private var setUpAction: UIAction = {
        var title = Components.setUpActionTitle
        return UIAction(title: title) { _ in }
    }()
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override init() {
        super.init()
        self.customView = self.button
    }
    
    func update(location: UserLocationDTO.UserLocation) {
        let mainLocationName = location.main.locationName
        var children: [UIAction] = [
            self.mainAction,
            self.subAction,
            self.setUpAction
        ]
        
        DispatchQueue.main.async {
            self.button.setTitle(mainLocationName, for: .normal)
            self.mainAction.title = mainLocationName
            if let subLocationName = location.sub.locationName {
                self.subAction.title = subLocationName
            } else {
                children.remove(at: 1)
            }
            self.button.menu = UIMenu(
                options: .displayInline,
                children: children
            )
        }
    }
    
    enum Components {
        static let buttonImage = UIImage(systemName: "chevron.down")?.withAlignmentRectInsets(
            UIEdgeInsets(
                top: -5,
                left: -2,
                bottom: -5,
                right: -2
            )
        )
        static let setUpActionTitle = "내 동네 설정하기"
    }
}
