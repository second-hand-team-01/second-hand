//
//  CategoryTableViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/08/14.
//

import UIKit

final class CategoryTableViewController: UITableViewController {
    private var categoryNetworkManager = CategoryNetworkManager()
    private var categorys: [String] = []
    var categoryIndexSender: ((Int) -> ())?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.loadData()
    }
    
    private func loadData() {
        Task {
            guard let categorys = await self.categoryNetworkManager.loadData() else {
                return
            }
            self.categorys = categorys
            self.tableView.reloadData()
        }
    }
    
    // MARK: - Table View
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return categorys.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        var content = cell.defaultContentConfiguration()
        content.text = categorys[indexPath.row]
        cell.contentConfiguration = content

        return cell
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.categoryIndexSender?(indexPath.row + 1)
        self.navigationController?.popViewController(animated: true)
    }
}
