//
//  EditViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/08/04.
//

import UIKit

final class EditViewController: UIViewController {
    private var imageUploadView = ImageUploadView()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        self.setTitle("내 물건 팔기")
        self.addSubviews()
    }
    
    private func addSubviews() {
        self.imageUploadView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(self.imageUploadView)
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.addConstraints()
    }

    private func addConstraints() {
        self.addConstraintToImageUploadView()
    }
    
    private func addConstraintToImageUploadView() {
        guard let navigationBarBottom = self.navigationController?.navigationBar.bottomAnchor else {
            return
        }
        
        NSLayoutConstraint.activate([
            self.imageUploadView.topAnchor.constraint(equalTo: navigationBarBottom),
            self.imageUploadView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            self.imageUploadView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            self.imageUploadView.bottomAnchor.constraint(lessThanOrEqualTo: self.view.bottomAnchor)
        ])
    }
}
