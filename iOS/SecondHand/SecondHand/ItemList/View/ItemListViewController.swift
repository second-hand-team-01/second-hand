//
//  ItemListViewController.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

final class ItemListViewController: UIViewController {
    private var datasource: UITableViewDiffableDataSource<Section, ItemViewModel>!
    private var currentSnapShot: NSDiffableDataSourceSnapshot<Section, ItemViewModel>!
    private var data: [Item] = Item.sampleData
    private var locationIndex = 1041
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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.addSubview(self.itemListTableView)
        self.addActionToCreateButton()
        self.view.addSubview(self.createButton)
        self.addActionToAlertController()
        self.itemListTableView.delegate = self
        self.itemListTableView.register(ItemListTableViewCell.self, forCellReuseIdentifier: ItemListTableViewCell.identifier)
        self.layoutItemListUITableView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }

    private func layoutItemListUITableView() {
        itemListTableView.frame = view.bounds
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
    
    override func viewWillLayoutSubviews() {
        self.configureDataSource()
        self.configureSnapshot(with: <#T##[ItemViewModel]#>)
        self.configureNavigationItem()
        self.addConstraintToCreateButton()
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
        
        let viewController = DetailViewController(itemIndex: 20)
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
            Task {
                let itemModels = await self.itemListRepository.fetchData(locationIndex: self.locationIndex)
                let itemViewModels = self.itemListPresenter.convert(from: itemModels)
                self.configureSnapshot(with: itemViewModels)
            }
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
