//
//  DetailVC+layoutScrollView.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

extension DetailViewController {
    func layoutScrollView() {
        self.view.addSubview(scrollView)
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        
        scrollView.addSubview(detailContentView)
        detailContentView.translatesAutoresizingMaskIntoConstraints = false
        
        self.view.addSubview(toolbar)
        toolbar.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            scrollView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            scrollView.topAnchor.constraint(equalTo: self.view.topAnchor),
            scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor),
            
            detailContentView.leadingAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.leadingAnchor),
            detailContentView.trailingAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.trailingAnchor),
            // TODO: - ScrollView의 TopAnchor에 맞추게 되면 네비게이션바 바텀에 맞춰짐?
            detailContentView.topAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.topAnchor),
            detailContentView.bottomAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.bottomAnchor),
            detailContentView.widthAnchor.constraint(equalTo: scrollView.frameLayoutGuide.widthAnchor, multiplier: 1),

            toolbar.topAnchor.constraint(equalTo: self.view.bottomAnchor),
            toolbar.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            toolbar.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            toolbar.heightAnchor.constraint(equalToConstant: 120)
        ])
    }
}
