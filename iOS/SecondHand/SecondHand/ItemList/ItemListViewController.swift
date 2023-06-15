//
//  ItemListViewController.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

class ItemListViewController: UIViewController {
    private var datasource: UICollectionViewDiffableDataSource<Section, Item>!
    private var currentSnapShot: NSDiffableDataSourceSnapshot<Section, Item>!
    private var data: [Item] = []
    private var itemListCollectionView: UICollectionView = UICollectionView(frame: .zero, collectionViewLayout: UICollectionViewFlowLayout())

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
    override func viewWillLayoutSubviews() {
        <#code#>
    }
    
    
}
