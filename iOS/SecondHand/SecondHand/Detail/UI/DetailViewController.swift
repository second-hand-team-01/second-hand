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
    
    private func makeEditAction() -> UIAlertAction {
        let handler: (UIAlertAction) -> () = { _ in
            if let detail = self.detailUseCase.detail {
                let detailToEdit = EditModelMapper.convertFrom(detail, itemIndex: self.detailUseCase.itemIndex)
                let editUseCase = EditUseCase(
                    detailToEdit: detailToEdit,
                    editRemoteDataSource: EditRemoteDataSource(itemIndex: detailToEdit.itemIndex)
                )
                let editViewController = EditViewController(editUseCase: editUseCase)
                self.present(
                    UINavigationController(rootViewController: editViewController),
                    animated: true
                )
            }
        }

        return UIAlertAction(
            title: "게시글 수정",
            style: .default,
            handler: handler
        )
    }
    
    private func makeDeleteAction() -> UIAlertAction {
        return UIAlertAction(
            title: "삭제",
            style: .destructive,
            handler: { _ in
                return
            }
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
    
    // MARK: Oberver
    
    private func addObservers() {
        self.addObserverItemAddedToFavorites()
        self.addObserverItemDeletedFromFavorites()
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
    
    // MARK: DataSender
    
    private func setDataSender() {
        self.detailUseCase.dataSender = { (data) in
            self.toolbar.update(price: data.price, isItemInFavorites: data.isUserInterested)
            self.detailContentView.update(by: data)
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
