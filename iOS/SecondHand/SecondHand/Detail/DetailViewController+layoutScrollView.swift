//
//  DetailVC+layoutScrollView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

extension DetailViewController {
    func addSubViews() {
        let subViews = [
            scrollView,
            toolbar
        ]
        
        subViews.forEach {
            self.view.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
        
        self.scrollView.addSubview(detailContentView)
        detailContentView.translatesAutoresizingMaskIntoConstraints = false
    }
    
    func layoutConstraint() {
        
        NSLayoutConstraint.activate([
            scrollView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            scrollView.topAnchor.constraint(equalTo: self.view.topAnchor),
            scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: -83),

            detailContentView.leadingAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.leadingAnchor),
            detailContentView.trailingAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.trailingAnchor),
            // TODO: - ScrollView의 TopAnchor에 맞추게 되면 네비게이션바 바텀에 맞춰짐?
            detailContentView.topAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.topAnchor),
            detailContentView.bottomAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.bottomAnchor,
                                                      constant: -40),
            detailContentView.widthAnchor.constraint(equalTo: scrollView.frameLayoutGuide.widthAnchor, multiplier: 1),

//            // TODO: - Toolbar 적용 안됨
            toolbar.leadingAnchor.constraint(equalTo: self.scrollView.leadingAnchor),
            toolbar.trailingAnchor.constraint(equalTo: self.scrollView.trailingAnchor),
            toolbar.topAnchor.constraint(equalTo: self.scrollView.bottomAnchor),
            toolbar.bottomAnchor.constraint(equalTo: self.view.bottomAnchor)
        ])

        // 스크롤 기능을 적용시키기위해서는 priority를 낮출 필요가 있어
        // constraint를 외부에서 따로 적용했습니다.
        let heightConstraint = self.detailContentView.heightAnchor.constraint(equalTo: self.scrollView.heightAnchor)
        heightConstraint.priority = UILayoutPriority(250)
        heightConstraint.isActive = true
        
//        detailContentView.addSubviews()
//        detailContentView.layoutConstraint()
    }
}
