//
//  EditUseCase.swift
//  SecondHand
//
//  Created by Wood on 2023/08/17.
//

import Foundation

class EditUseCase {
    var detailToEdit: EditModel?
    var itemIndex: Int {
        return self.detailToEdit?.itemIndex ?? 0
    }
    private var editRemoteDataSource: EditRemoteDataSource?
    
    init(
        detailToEdit: EditModel? = nil,
        editRemoteDataSource: EditRemoteDataSource? = nil
    ) {
        self.detailToEdit = detailToEdit
        self.editRemoteDataSource = EditRemoteDataSource(itemIndex: detailToEdit?.itemIndex ?? 0)
    }
    
    private func createEditModel(
        from detailViewModel: DetailViewModel,
        isEdit: Bool
    ) -> EditModel {
        let imageKeys = detailViewModel.imageKeys
        let itemIndex = isEdit ? self.itemIndex : -1
        let name = detailViewModel.title
        let price = detailViewModel.price
        let description = detailViewModel.description
        let locationIndex = 1
        let categoryIndex = 1
        let status = "판매중"
        
        let editModel = EditModel(
            imageKeys: imageKeys,
            itemIndex: itemIndex,
            name: name,
            price: price,
            description: description,
            locationIndex: locationIndex,
            categoryIndex: categoryIndex,
            status: status
        )
        
        return editModel
    }
    
    var createResultSender: ((Bool) -> ())?
    
    func createProduct(detailViewModel: DetailViewModel) {
        let detailToCreate = self.createEditModel(from: detailViewModel, isEdit: false)
        Task {
            if await self.editRemoteDataSource?.createProduct(editModel: detailToCreate) != nil {
                self.createResultSender?(true)
            }
            self.createResultSender?(false)
        }
    }
    
    var editResultSender: ((Bool) -> ())?
    
    func editDetail(detailViewModel: DetailViewModel) {
        let detailToEdit = self.createEditModel(from: detailViewModel, isEdit: true)
        Task {
            if await self.editRemoteDataSource?.editProduct(editModel: detailToEdit) != nil {
                self.editResultSender?(true)
            }
            self.editResultSender?(false)
        }
    }
}
