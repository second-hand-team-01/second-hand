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

        button.tintColor = .black
        button.configuration = configuration
        button.layer.cornerRadius = 15
        button.layer.borderWidth = 0.5

        return button
    }()
    private let bottomLine: UIView = {
        var view = UIView()
        view.backgroundColor = UIColor.lightGray
        return view
    }()
    private let productInputView = ProductInputView()
    private let pickerViewController: PHPickerViewController = {
        var configuration = PHPickerConfiguration()
        configuration.selectionLimit = 10
        configuration.filter = .images
        return PHPickerViewController(configuration: configuration)
    }()

    // MARK: - UseCase
    
    private var editUseCase: EditUseCase
    
    required init?(coder: NSCoder) {
        fatalError("Fail To initialize EditViewController")
    }
    
    init(editUseCase: EditUseCase) {
        self.editUseCase = editUseCase
        super.init(nibName: nil, bundle: nil)
    }
    
    private func loadData() {
        if let detailToEdit = self.editUseCase.detailToEdit {
            self.albumImageViewer.loadImagesFrom(keys: detailToEdit.imageKeys)
            self.productInputView.update(detailToEdit: detailToEdit)
        }
    }
    
    // MARK: PHPickerViewController
    
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
                
                let imageCount = self.albumImageViewer.getCountOfImages()
                DispatchQueue.main.async {
                    self.imageUploadButton.titleLabel?.attributedText = NSAttributedString(string: "\(imageCount)/10")
                }
            }
        }
    }
    
    // MARK: - BarButtonItem
    
    private var cancelButton = UIBarButtonItem(systemItem: .cancel)
    private var doneButton = UIBarButtonItem(systemItem: .done)
    
    private func configureCancelButton() {
        let action = UIAction { _ in
            self.dismiss(animated: true)
        }

        self.cancelButton.primaryAction = action
        self.navigationItem.leftBarButtonItem = self.cancelButton
    }
    
    
    private func didTapDoneButton() {
        let enteredDetail = self.makeDetailFromEnteredInfo()
        if self.editUseCase.detailToEdit != nil {
            self.editUseCase.editDetail(detailViewModel: enteredDetail)
        } else {
            self.editUseCase.createProduct(detailViewModel: enteredDetail)
        }
    }
    
    private func configureDoneButton() {
        let action = UIAction { _ in
            self.didTapDoneButton()
        }
        
        self.doneButton.primaryAction = action
        self.navigationItem.rightBarButtonItem = self.doneButton
    }
    
    private func getImageCacheKeys() -> [NSString] {
        let images = self.albumImageViewer.images
        var imageCacheKeys: [NSString] = []
        images.enumerated().forEach { (index: Int, image: UIImage) in
            if let object = image.jpegData(compressionQuality: 0.5) {
                if (self.editUseCase.detailToEdit?.itemIndex) != nil {
                    let key = NSString(string: "\(self.editUseCase.itemIndex)/\(index)")
                    DataCacheManager.store(key: key, object: object)
                    imageCacheKeys.append(key)
                } else {
                    let key = NSString(string: "new/\(index)")
                    DataCacheManager.store(key: key, object: object)
                    imageCacheKeys.append(key)
                }
            }
        }
        
        return imageCacheKeys
    }
    
    private func makeDetailFromEnteredInfo() -> DetailViewModel {
        let imageKeys = getImageCacheKeys()
        let productInfo = self.productInputView.getEnteredProductInfo()
        let title = productInfo[0]
        let price = Int(productInfo[1]) ?? 0
        let description = productInfo[2]
        let categoryIndex = self.categoryIndex ?? 0
        
        return DetailViewModel(
            imageKeys: imageKeys,
            title: title,
            price: price,
            description: description,
            categoryIndex: categoryIndex
        )
    }
    
    // MARK: - Create Product

    private var failToCreateAlert: UIAlertController = {
        let alertController = UIAlertController(
            title: Components.AlertMessage.failToCreate,
            message: nil,
            preferredStyle: .alert
        )
        let alertAction = UIAlertAction(
            title: "확인",
            style: .default
        )
        alertController.addAction(alertAction)
        return alertController
    }()

    private func setCreateResultSender() {
        self.editUseCase.createResultSender = { (result: Bool) in
            DispatchQueue.main.async {
                if result {
                    self.dismiss(animated: true)
                } else {
                    self.present(self.failToCreateAlert, animated: true)
                }
            }
        }
    }
    
    // MARK: - Edit Product
    
    private var failToEditAlert: UIAlertController = {
        let alertController = UIAlertController(
            title: Components.AlertMessage.failToEditDetail,
            message: nil,
            preferredStyle: .alert
        )
        let alertAction = UIAlertAction(
            title: "확인",
            style: .default
        )
        alertController.addAction(alertAction)
        return alertController
    }()
    
    private func setEditResultSender() {
        self.editUseCase.editResultSender = { (result: Bool) in
            DispatchQueue.main.async {
                if result {
                    self.dismiss(animated: true)
                } else {
                    self.present(self.failToEditAlert, animated: true)
                }
            }
        }
    }
    
    private func configureBarButtonItems() {
        self.configureCancelButton()
        self.configureDoneButton()
    }
    
    private func showCategoryDidCateogryListButtonTapped() {
        self.productInputView.categoryListButtonTapSender = { _ in
            self.navigationController?.pushViewController(CategoryTableViewController(), animated: true)
        }
    }
    
    // MARK: - Category TableViewController
    
    private var categoryTableViewController = CategoryTableViewController()
    private var categoryIndex: Int?
    
    private func getIndexWhenCategorySelected() {
        self.categoryTableViewController.categoryIndexSender = { (index: Int) in
            self.categoryIndex = index
        }
    }
    
    private func addSubviews() {
        let subViews = [
            self.imageUploadButton,
            self.albumImageViewer,
            self.bottomLine,
            self.productInputView
        ]
        
        subViews.forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            self.view.addSubview($0)
        }
    }
    
    private func setUp() {
        self.view.backgroundColor = .white
        self.setTitle("내 물건 팔기")
        self.pickerViewController.delegate = self
        self.addActionToImageUploadButton()
        self.configureBarButtonItems()
        self.showCategoryDidCateogryListButtonTapped()
        self.getIndexWhenCategorySelected()
        self.setCreateResultSender()
        self.setEditResultSender()
        self.addSubviews()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setUp()
        self.loadData()
    }
    
    // MARK: - AutoLayout 설정
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.addConstraints()
    }

    private func addConstraints() {
        self.addConstraintToImageUploadButton()
        self.addConstraintToAlbumImageViewer()
        self.addConstraintToBottomLine()
        self.addConstraintToProductInputView()
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
    
    private func addConstraintToAlbumImageViewer() {
        NSLayoutConstraint.activate([
            self.albumImageViewer.topAnchor.constraint(equalTo: self.imageUploadButton.topAnchor),
            self.albumImageViewer.leadingAnchor.constraint(
                equalTo: self.imageUploadButton.trailingAnchor,
                constant: 15
            ),
            self.albumImageViewer.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -15
            ),
            self.albumImageViewer.bottomAnchor.constraint(equalTo: self.imageUploadButton.bottomAnchor)
        ])
    }
    
    private func addConstraintToBottomLine() {
        NSLayoutConstraint.activate([
            self.bottomLine.topAnchor.constraint(
                equalTo: self.imageUploadButton.bottomAnchor,
                constant: 15
            ),
            self.bottomLine.leadingAnchor.constraint(equalTo: self.imageUploadButton.leadingAnchor),
            self.bottomLine.trailingAnchor.constraint(equalTo: self.albumImageViewer.trailingAnchor),
            self.bottomLine.heightAnchor.constraint(equalToConstant: 1.0)
        ])
    }
    
    private func addConstraintToProductInputView() {
        NSLayoutConstraint.activate([
            self.productInputView.topAnchor.constraint(
                equalTo: self.bottomLine.bottomAnchor,
                constant: 15
            ),
            self.productInputView.leadingAnchor.constraint(equalTo: self.bottomLine.leadingAnchor),
            self.productInputView.trailingAnchor.constraint(equalTo: self.bottomLine.trailingAnchor),
            self.productInputView.heightAnchor.constraint(equalToConstant: 700)
        ])
    }

    enum LogMessage {
        static let failToLoadImage = "선택한 이미지를 로드 할 수 없습니다."
        static let failToCastingUIImage = "선택한 이미지를 캐스팅 할 수 없습니다."
    }
    
    enum Components {
        enum AlertMessage {
            static let failToEditDetail: String  = "상품 수정에 실패했습니다."
            static let failToCreate: String = "상품 생성에 실패했습니다."
        }
    }
}
