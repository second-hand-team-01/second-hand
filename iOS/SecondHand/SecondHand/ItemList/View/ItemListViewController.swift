//
//  ItemListViewController.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

final class ItemListViewController: UIViewController {
    private var datasource: UITableViewDiffableDataSource<Section, ItemViewModel>!
    private var currentSnapShot = NSDiffableDataSourceSnapshot<Section, ItemViewModel>()
    private var items: [ItemViewModel] = []
    private let defaultLocationIndex = 1041
    private lazy var locationIndex = self.defaultLocationIndex
    private var itemListTableView: UITableView = UITableView()
    private var itemListPresenter: ItemListPresenter = ItemListPresentService()
    private let itemListRepository = ItemListRepositoryService(
        remoteDataSource: ItemListRemoteDataService(),
        localDataSource: ItemListLocalDataService()
    )
    private var alertController: UIAlertController = {
        let alertController = UIAlertController(
            title: "로그인을 먼저 해주세요",
            message: "로그인 화면으로 이동하시겠습니까?",
            preferredStyle: .alert
        )
        return alertController
    }()
    private var createButton: UIButton = {
        var configuration = UIButton.Configuration.filled()
        configuration.baseBackgroundColor = .orange
        configuration.cornerStyle = .capsule
        configuration.image = Components.createButtonImage
        
        return UIButton(configuration: configuration)
    }()
    
    private func addActionToCreateButton() {
        let action = UIAction { _ in
            if !SecretKeys.accessToken.isEmpty {
                let editViewController = EditViewController(editUseCase: EditUseCase())
                self.present(UINavigationController(rootViewController: editViewController), animated: true)
            } else {
                self.present(self.alertController, animated: true)
            }
        }
        
        self.createButton.addAction(action, for: .touchUpInside)
    }
    
    private func makeCancelAlertAction() -> UIAlertAction {
        let cancelHandler: ((UIAlertAction) -> ())? = { _ in }
        let cancelAlertAction = UIAlertAction(
            title: "취소",
            style: .destructive,
            handler: cancelHandler
        )
        
        return cancelAlertAction
    }
    
    private func makeConfirmAlertAction() -> UIAlertAction {
        let confirmHandler: ((UIAlertAction) -> ())? = { _ in
            self.moveToTab(to: TabIndex.account)
        }
        let confirmAlertAction = UIAlertAction(
            title: "확인",
            style: .default,
            handler: confirmHandler
        )
        
        return confirmAlertAction
    }
    
    private func addActionToAlertController() {
        let cancelAlertAction = self.makeCancelAlertAction()
        self.alertController.addAction(cancelAlertAction)
        
        let confirmAlertAction = self.makeConfirmAlertAction()
        self.alertController.addAction(confirmAlertAction)
    }
    
    private func loadItemList() {
        Task {
            let itemModels = await self.itemListRepository.fetchItemList(locationIndex: self.locationIndex)
            let itemViewModels = self.itemListPresenter.convert(from: itemModels)
            self.configureSnapshot(with: itemViewModels)
        }
    }
    
    private var itemNotExistView: UIView = {
        var view = UIView()
        view.backgroundColor = .darkGray
        return view
    }()
    
    @objc private func loadUserLocation(_ notification: Notification) {
        Task {
            let userLocation = await self.itemListRepository.fetchUserLocation()
            self.locationIndex = userLocation.main.locationIdx

            if self.currentSnapShot.numberOfItems > 0 {
                var emptySnapshot = self.datasource.snapshot()
                emptySnapshot.deleteAllItems()
                await self.datasource.apply(emptySnapshot)
            }
        }
    }
    
    private func addObservers() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(self.loadUserLocation),
            name: Notification.userHasBeenSigned,
            object: nil
        )
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.addSubview(self.itemListTableView)
        self.addActionToCreateButton()
        self.view.addSubview(self.createButton)
        self.addActionToAlertController()
        self.itemListTableView.delegate = self
        self.itemListTableView.register(ItemListTableViewCell.self, forCellReuseIdentifier: ItemListTableViewCell.identifier)
        self.configureDataSource()
        self.configureSnapshot(with: self.items)
        self.configureNavigationItem()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.loadItemList()
    }

    private func layoutItemListUITableView() {
        self.itemListTableView.frame = view.bounds
    }
    
    private func addConstraintToCreateButton() {
        self.createButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            self.createButton.topAnchor.constraint(greaterThanOrEqualTo: self.view.safeAreaLayoutGuide.topAnchor),
            self.createButton.leadingAnchor.constraint(greaterThanOrEqualTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            self.createButton.trailingAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.trailingAnchor,
                constant: -24
            ),
            self.createButton.bottomAnchor.constraint(
                equalTo: self.view.safeAreaLayoutGuide.bottomAnchor,
                constant: -24
            )
        ])
    }
    
//    private func addConstraintToItemNotExistView() {
//        self.itemNotExistView.isHidden = true
//        self.itemNotExistView.translatesAutoresizingMaskIntoConstraints = false
//
//        NSLayoutConstraint.activate([
//            self.itemNotExistView.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
//            self.itemNotExistView.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
//            self.itemNotExistView.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
//            self.itemNotExistView.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor)
//        ])
//    }
    
    override func viewWillLayoutSubviews() {
        self.layoutItemListUITableView()
        self.addConstraintToCreateButton()
//        self.addConstraintToItemNotExistView()
    }

    private var locationButton: UIBarButtonItem = {
        var barButtonItem = UIBarButtonItem()
        barButtonItem.title = "역삼1동"
        barButtonItem.style = .plain
        return barButtonItem
    }()
    
    private func configureNavigationItem() {
        self.locationButton.target = self
        self.navigationItem.leftBarButtonItem = self.locationButton
        
        let categoryButton = UIBarButtonItem(image: UIImage(systemName: "line.3.horizontal"), style: .plain, target: self, action: #selector(categoryButtonTapped))
        self.navigationItem.rightBarButtonItem = categoryButton
    }
    
    @objc private func locationButtonTapped() {
        
    }
    
    @objc private func categoryButtonTapped() {
    }
}

extension ItemListViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 150
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard SecretKeys.accessToken != "" else {
            self.present(self.alertController, animated: true)
            return
        }
        
        let indexPath = self.datasource.itemIdentifier(for: indexPath)
        guard let itemIndex = indexPath?.itemIndex else {
            print("아이템 인덱스 가져오는데 실패")
            return
        }
        let viewController = DetailViewController(itemIndex: itemIndex)
        self.navigationController?.pushViewController(viewController, animated: true)
    }
}

extension ItemListViewController {
    private func configureDataSource() {
        self.datasource = UITableViewDiffableDataSource<Section, ItemViewModel>(tableView: self.itemListTableView, cellProvider: {tableView, indexPath, itemViewModel in
            guard let cell = tableView.dequeueReusableCell(withIdentifier: ItemListTableViewCell.identifier, for: indexPath) as? ItemListTableViewCell else { return UITableViewCell()}
            
            cell.update(itemViewModel: itemViewModel)
            return cell
        })

        self.itemListTableView.dataSource = self.datasource
    }
    
    private func configureSnapshot(with items: [ItemViewModel]) {
        guard items.isEmpty == false else {
            return
        }
        
        self.currentSnapShot = NSDiffableDataSourceSnapshot<Section, ItemViewModel>()
        self.currentSnapShot.appendSections([.item])
        self.currentSnapShot.appendItems(items, toSection: .item)
        self.datasource.apply(self.currentSnapShot)
    }
}

extension ItemListViewController: UIScrollViewDelegate {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let position = scrollView.contentOffset.y
        if position > itemListTableView.contentSize.height - 100 - scrollView.frame.size.height {
            self.loadItemList()
        }
    }
    
    enum Components {
        static let createButtonImage = UIImage(systemName: "plus")?.withConfiguration(
            UIImage.SymbolConfiguration(
                pointSize: 20,
                weight: .medium
            )
        )
    }
}
