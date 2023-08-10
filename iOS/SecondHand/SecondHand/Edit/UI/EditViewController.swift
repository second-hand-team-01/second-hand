//
//  EditViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/08/04.
//

import PhotosUI

final class EditViewController: UIViewController, PHPickerViewControllerDelegate {
    private var albumImageViewer = AlbumImageViewer()
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
        self.albumImageViewer.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(self.albumImageViewer)
        
        self.imageUploadButton.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(self.imageUploadButton)
    }
    
    private func addActionToImageUploadButton() {
        let presentPickerViewController = UIAction { _ in
            self.present(self.pickerViewController, animated: true)
        }

        self.imageUploadButton.addAction(presentPickerViewController, for: .touchUpInside)
    }

    private func addCancelButtonToPickerViewController() {
        self.pickerViewController.navigationItem.leftBarButtonItem?.primaryAction = UIAction(handler: { _ in
            self.pickerViewController.dismiss(animated: true)
        })
    }
    
    func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
        picker.dismiss(animated: true)
        
        results.forEach { (result: PHPickerResult) in
            let itemProvider = result.itemProvider
            guard itemProvider.canLoadObject(ofClass: UIImage.self) else {
                LogManager.generate(level: .presentation, LogMessage.failToLoadImage)
                return
            }
            
            itemProvider.loadObject(ofClass: UIImage.self) { (image: NSItemProviderReading?, error: Error?) in
                if let errorMessage = error?.localizedDescription {
                    LogManager.generate(level: .presentation, errorMessage)
                    return
                }
                
                guard let image = image as? UIImage else {
                    LogManager.generate(level: .presentation, LogMessage.failToCastingUIImage)
                    return
                }

                self.albumImageViewer.add(image: image)
                
                DispatchQueue.main.async {
                    let imageCount = self.albumImageViewer.getCountOfImages()
                    self.imageUploadButton.titleLabel?.attributedText = NSAttributedString(string: "\(imageCount)/10")
                }
            }
        }
    }
    
    // MARK: - AutoLayout 설정
    
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
            self.albumImageViewer.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.albumImageViewer.leadingAnchor.constraint(
                equalTo: self.imageUploadButton.trailingAnchor,
                constant: 15
            ),
            self.albumImageViewer.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -15
            ),
            self.albumImageViewer.bottomAnchor.constraint(lessThanOrEqualTo: self.view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
    
    enum LogMessage {
        static let failToLoadImage = "선택한 이미지를 로드 할 수 없습니다."
        static let failToCastingUIImage = "선택한 이미지를 캐스팅 할 수 없습니다."
    }
}
