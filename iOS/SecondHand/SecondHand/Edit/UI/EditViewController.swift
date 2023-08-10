//
//  EditViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/08/04.
//

import PhotosUI

final class EditViewController: UIViewController, PHPickerViewControllerDelegate {
    private var imageUploadView = AlbumImageViewer()
    private var imageUploadButton: UIButton = {
        var button = UIButton()
        var configuration = UIButton.Configuration.plain()
        configuration.image = UIImage(systemName: "camera")
        configuration.imagePlacement = .top
        configuration.buttonSize = .medium
        
        var title = AttributedString("0/10")
        title.font = .systemFont(ofSize: 13)
        configuration.attributedTitle = title
        
        button.configuration = configuration
        button.layer.cornerRadius = 15
        button.layer.borderWidth = 0.5
        
        return button
    }()
    private let pickerViewController: PHPickerViewController = {
        var configuration = PHPickerConfiguration()
        configuration.selectionLimit = 10
        configuration.filter = .images
        return PHPickerViewController(configuration: configuration)
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        self.setTitle("내 물건 팔기")
        self.pickerViewController.delegate = self
        self.addSubviews()
        self.addActionToImageUploadButton()
    }
    
    private func addSubviews() {
        self.imageUploadView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(self.imageUploadView)
        
        self.imageUploadButton.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(self.imageUploadButton)
    }
    
    private func addActionToImageUploadButton() {
        let presentPickerViewController = UIAction { _ in
            self.present(self.pickerViewController, animated: true)
        }
        
        self.imageUploadButton.addAction(presentPickerViewController, for: .touchUpInside)
    }
    
    func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.addConstraints()
    }

    private func addConstraints() {
        self.addConstraintToImageUploadButton()
        self.addConstraintToImageUploadView()
    }
    
    private func addConstraintToImageUploadButton() {
        NSLayoutConstraint.activate([
            self.imageUploadButton.topAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.topAnchor,
                constant: 15
            ),
            self.imageUploadButton.leadingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.leadingAnchor,
                constant: 15
            ),
            self.imageUploadButton.widthAnchor.constraint(equalToConstant: 80),
            self.imageUploadButton.heightAnchor.constraint(
                equalTo: self.imageUploadButton.widthAnchor,
                multiplier: 1
            )
        ])
    }
    
    private func addConstraintToImageUploadView() {
        NSLayoutConstraint.activate([
            self.imageUploadView.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.imageUploadView.leadingAnchor.constraint(
                equalTo: self.imageUploadButton.trailingAnchor,
                constant: 15
            ),
            self.imageUploadView.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -15
            ),
            self.imageUploadView.bottomAnchor.constraint(lessThanOrEqualTo: self.view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
}
