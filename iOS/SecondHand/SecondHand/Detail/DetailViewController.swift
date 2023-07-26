//
//  DetailViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/14.
//

import UIKit

class DetailViewController: UIViewController {
    private var scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.contentInsetAdjustmentBehavior = .never
        return scrollView
    }()
    private var detailContentView = DetailContentView(frame: .zero)
    private var toolbar = DetailToolbar(frame: .zero)
    private var alertController: UIAlertController = {
        let alertController = UIAlertController(
            title: Components.alertMessage,
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
        self.view.backgroundColor = .white
        self.setTabBar(isHiding: true)
        self.detailUseCase.loadData()
        self.setDataSender()
        self.setFavoriteEventHandler()
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        self.addSubViews()
        self.layoutConstraint()
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.setTabBar(isHiding: false)
    }

    private func setTabBar(isHiding: Bool) {
        self.tabBarController?.tabBar.isHidden = isHiding
    }
    
    private func setDataSender() {
        self.detailUseCase.dataSender = { (data) in
            self.toolbar.update(price: data.price, isItemInFavorites: data.isUserInterested)
            self.detailContentView.update(by: data)
        }
    }

    private func setFavoriteEventHandler() {
        self.toolbar.favoriteButtonTapSender = { (isItemInFavorites: Bool) in
            guard let isAdding = self.detailUseCase.configureFavorites(isAdding: isItemInFavorites) else {
                self.present(self.alertController, animated: true)
                return
            }
            
            self.toolbar.configureFavoriteButton(isAdding: isAdding)
        }
    }
}

// MARK: - Constraint 설정
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
        static let alertMessage: String = "요청이 실패했습니다."
    }
}
