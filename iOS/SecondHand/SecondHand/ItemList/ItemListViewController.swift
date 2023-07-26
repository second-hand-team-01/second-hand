//
//  ItemListViewController.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

final class ItemListViewController: UIViewController {
    private var datasource: UITableViewDiffableDataSource<Section, Item>!
    private var currentSnapShot: NSDiffableDataSourceSnapshot<Section, Item>!
    private var data: [Item] = Item.sampleData
    private var itemListTableView: UITableView = UITableView()
    private let network: Network = Network()
    private var alertController: UIAlertController = {
        let alertController = UIAlertController(
            title: "로그인을 먼저 해주세요",
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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.addSubview(self.itemListTableView)
        self.itemListTableView.delegate = self
        self.itemListTableView.register(ItemListTableViewCell.self, forCellReuseIdentifier: ItemListTableViewCell.identifier)
        self.layoutItemListUITableView()
    }

    private func layoutItemListUITableView() {
        itemListTableView.frame = view.bounds
    }
    
    override func viewWillLayoutSubviews() {
        self.configureDataSource()
        self.configureSnapshot(with: data)
        self.configureNavigationItem()
    }
}

extension ItemListViewController {
    private func configureNavigationItem() {
        let locationButton = UIBarButtonItem(title: "역삼1동", style: .plain, target: self, action: #selector(locationButtonTapped))
        self.navigationItem.leftBarButtonItem = locationButton
        
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
        self.datasource = UITableViewDiffableDataSource<Section, Item>(tableView: self.itemListTableView, cellProvider: {tableView, indexPath, item in
            guard let cell = tableView.dequeueReusableCell(withIdentifier: ItemListTableViewCell.identifier, for: indexPath) as? ItemListTableViewCell else { return UITableViewCell()}
            
            cell.titleLabel.updateText(to: item.itemTitle)
            cell.locationLabel.updateText(to: item.location)
            cell.priceLabel.updateText(to: item.price)
            cell.writeTimeLabel.updateText(to: item.writeDate)
            cell.likeCountLabel.text = "\(item.likeCount)"
            cell.commentCountLabel.text = "\(item.chatCount)"

            return cell
        })
        
        self.itemListTableView.dataSource = self.datasource
    }
    
    private func configureSnapshot(with data: [Item]) {
        self.currentSnapShot = NSDiffableDataSourceSnapshot<Section, Item>()
        self.currentSnapShot.appendSections([.item])
        self.currentSnapShot.appendItems(data, toSection: .item)
        
        self.datasource.apply(self.currentSnapShot)
    }
}

extension ItemListViewController: UIScrollViewDelegate {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let position = scrollView.contentOffset.y

        if position > itemListTableView.contentSize.height - 100 - scrollView.frame.size.height {
            guard !self.network.ispagination else { return }
            
            self.network.fetchData(index: self.data.count, pagination: false, complete: { [weak self] result in
                switch result {
                case .success(let data):
                    self?.data += data
                    DispatchQueue.main.async {
                        guard let currentData = self?.data else { return }
                        self?.configureSnapshot(with: currentData)
                    }
                case .failure(_):
                    break
                }
            })
        }
    }
}
