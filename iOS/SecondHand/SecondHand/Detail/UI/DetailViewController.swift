//
//  DetailViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit
import Toaster

final class DetailViewController: UIViewController {
    private var scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.contentInsetAdjustmentBehavior = .never
        return scrollView
    }()
    private var detailContentView = DetailContentView()
    private var toolbar = DetailToolbar()
    private var detailUseCase: DetailUseCase

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    init(itemIndex: Int) {
        self.detailUseCase = DetailUseCase(itemIndex: itemIndex)
        super.init(nibName: nil, bundle: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.setUpUI()
        self.setDataSender()
        self.setFavoriteEventHandler()
        self.addObservers()
    }
    
    private func setUpUI() {
        self.view.backgroundColor = .white
        setTabBar(isHiding: true)
        self.addMenuBarButtonItemToNavigationBar()
        self.addSubViews()
    }
    
    // MARK: Navigation Bar
    
    private var editNavigationViewController: UINavigationController = {
        var editViewController = EditViewController(editUseCase: EditUseCase())
        var navigationController = UINavigationController(rootViewController: editViewController)
        navigationController.modalPresentationStyle = .fullScreen
        return navigationController
    }()
    
    private func makeEditAction() -> UIAlertAction {
        let handler: (UIAlertAction) -> () = { _ in
            if let detail = self.detailUseCase.detail {
                let detailToEdit = EditModelMapper.convertFrom(detail, itemIndex: self.detailUseCase.itemIndex)
                let editViewController = EditViewController(editUseCase: EditUseCase(detailToEdit: detailToEdit))
                self.editNavigationViewController.setViewControllers([editViewController], animated: true)
                self.present(self.editNavigationViewController, animated: true)
            }
        }

        return UIAlertAction(
            title: "게시글 수정",
            style: .default,
            handler: handler
        )
    }
    
    private var deleteAlertController: UIAlertController = {
        let deleteAlertController = UIAlertController(
            title: "정말로 게시물을 삭제하시겠습니까?",
            message: "해당 게시물은 삭제됩니다.",
            preferredStyle: .alert
        )
        
        return deleteAlertController
    }()
    
    private func addActionToDeleteAlertController() {
        let deleteConfirmHandler: (UIAlertAction) -> () = { _ in
            self.detailUseCase.deleteItem()
        }
        
        let deleteConfirmAction = UIAlertAction(
            title: "네",
            style: .destructive,
            handler: deleteConfirmHandler
        )
        self.deleteAlertController.addAction(deleteConfirmAction)
        
        let deleteCancelAction = UIAlertAction(
            title: "아니요",
            style: .cancel
        )
        self.deleteAlertController.addAction(deleteCancelAction)
    }
    
    private func makeDeleteAction() -> UIAlertAction {
        self.addActionToDeleteAlertController()
        
        let handler: (UIAlertAction) -> () = { _ in
            self.present(self.deleteAlertController, animated: true)
        }
        
        return UIAlertAction(
            title: "삭제",
            style: .destructive,
            handler: handler
        )
    }
    
    private func makeCancelAction() -> UIAlertAction {
        return UIAlertAction(
            title: "취소",
            style: .cancel
        )
    }
    
    private func makeMenuAlert() -> UIAlertController {
        let alertController = UIAlertController(
            title: nil,
            message: nil,
            preferredStyle: .actionSheet
        )
        
        let editAction = self.makeEditAction()
        alertController.addAction(editAction)

        let deleteAction = self.makeDeleteAction()
        alertController.addAction(deleteAction)

        let cancelAction = self.makeCancelAction()
        alertController.addAction(cancelAction)
        
        return alertController
    }
    
    private func addMenuBarButtonItemToNavigationBar() {
        var button = UIButton(type: .custom)
        button.frame.size = CGSize(width: 24, height: 24)
        button.setImage(UIImage(systemName: "ellipsis"), for: .normal)
        
        let alertAction = UIAction { _ in
            self.present(self.makeMenuAlert(), animated: true)
        }
        button.addAction(alertAction, for: .touchUpInside)

        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
    }
    
    private func updateMenuBarButton(sellerIndex: Int) {
        var isUserNotSeller: Bool = true
        if sellerIndex == SecretKeys.userIndex {
            isUserNotSeller = false
        }
        
        DispatchQueue.main.async {
            self.navigationItem.rightBarButtonItem?.isHidden = isUserNotSeller
        }
    }
    
    // MARK: Oberver
    
    private func addObservers() {
        self.addObserverItemAddedToFavorites()
        self.addObserverItemDeletedFromFavorites()
        self.addObserverItemDeleted()
    }

    @objc private func addItemToFavorites(_: Notification) {
        DispatchQueue.main.async {
            let successMessage = Toast(
                text: "상품을 관심목록에 저장하였습니다.",
                duration: Delay.short
            )
            successMessage.show()
        }
        self.toolbar.configureFavoriteButton(isAdding: true)
    }

    private func addObserverItemAddedToFavorites() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(addItemToFavorites),
            name: Notification.itemAddedToFavorites,
            object: nil
        )
    }

    @objc private func deleteItemFromFavorites() {
        self.toolbar.configureFavoriteButton(isAdding: false)
    }

    private func addObserverItemDeletedFromFavorites() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(deleteItemFromFavorites),
            name: Notification.itemDeletedFromFavorites,
            object: nil
        )
    }
    
    private var deleteFailAlertController: UIAlertController = {
        var alertController = UIAlertController(
            title: "상품 삭제가 실패했습니다",
            message: "서버 오류입니다.",
            preferredStyle: .alert
        )
        return alertController
    }()
    
    private func addObserverItemDeleted() {
        let using: (Notification) -> () = { notification in
            if notification.object != nil {
                self.navigationController?.popViewController(animated: true)
                Toast(
                    text: "상품이 삭제되었습니다.",
                    duration: Delay.short
                ).show()
            } else {
                self.present(self.deleteFailAlertController, animated: true)
            }
        }
        
        NotificationCenter.default.addObserver(
            forName: Notification.itemHasBeenDeleted,
            object: nil,
            queue: .main,
            using: using
        )
    }

    // MARK: DataSender
    
    private func setDataSender() {
        self.detailUseCase.dataSender = { (data) in
            self.toolbar.update(price: data.price, isItemInFavorites: data.isUserInterested)
            self.detailContentView.update(by: data)
            self.updateMenuBarButton(sellerIndex: data.sellerIndex)
        }
    }

    private var signInFailAlert: UIAlertController = {
        let alertController = UIAlertController(
            title: Components.AlertMessage.failToAddFavorite,
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
    
    private func setFavoriteEventHandler() {
        self.toolbar.favoriteButtonTapSender = { (isItemInFavorites: Bool) in
            let isAdding = !isItemInFavorites
            self.detailUseCase.configureFavorites(isAdding: isAdding)
        }

        self.detailUseCase.favoriteEventFailSender = { (isFail: Bool) in
            if isFail {
                DispatchQueue.main.async {
                    self.present(self.signInFailAlert, animated: true)
                }
            } else {
            }
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.detailUseCase.loadData()
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.layoutConstraint()
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        setTabBar(isHiding: false)
    }
}

// MARK: Auto Layout

extension DetailViewController {
    private func addSubViews() {
        let subViews = [
            scrollView,
            toolbar
        ]

        subViews.forEach {
            self.view.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }

        self.scrollView.addSubview(detailContentView)
        self.detailContentView.translatesAutoresizingMaskIntoConstraints = false
    }
    
    private func layoutConstraint() {
        addSubViews()
        layoutScrollView()
        layoutDetailContentView()
        layoutToolbar()
    }
    
    private func layoutScrollView() {
        let toolbarHeight: CGFloat = -83
        
        NSLayoutConstraint.activate([
            scrollView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            scrollView.topAnchor.constraint(equalTo: self.view.topAnchor),
            scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: toolbarHeight)
        ])
        
        let heightConstraint = self.detailContentView.heightAnchor.constraint(equalTo: self.scrollView.heightAnchor)
        heightConstraint.priority = UILayoutPriority(250)
        heightConstraint.isActive = true
    }
    
    private func layoutDetailContentView() {
        NSLayoutConstraint.activate([
            detailContentView.leadingAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.leadingAnchor),
            detailContentView.trailingAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.trailingAnchor),
            detailContentView.topAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.topAnchor),
            detailContentView.bottomAnchor.constraint(equalTo: self.scrollView.contentLayoutGuide.bottomAnchor,
                                                      constant: -40),
            detailContentView.widthAnchor.constraint(equalTo: scrollView.frameLayoutGuide.widthAnchor, multiplier: 1)
        ])
    }
    
    private func layoutToolbar() {
        NSLayoutConstraint.activate([
            toolbar.leadingAnchor.constraint(equalTo: self.scrollView.leadingAnchor),
            toolbar.trailingAnchor.constraint(equalTo: self.scrollView.trailingAnchor),
            toolbar.topAnchor.constraint(equalTo: self.scrollView.bottomAnchor),
            toolbar.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
    
    enum Components {
        enum AlertMessage {
            static let failToAddFavorite: String = "관심상품 요청이 실패했습니다."
        }
    }
}
