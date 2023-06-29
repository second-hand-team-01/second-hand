//
//  AccountInfoUseCase.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import Foundation

struct AccountInfo {
    var imageUrl: String
    var userName: String
}

class AccountInfoUseCase {
    private var accountInfo: AccountInfo?
    private var networkManager: AccountInfoNetworkManager
    
    init() {
        self.networkManager = AccountInfoNetworkManager()
    }
    
    func loadData() {
        Task {
            guard let data = await networkManager.request()?.data else {
                return
            }
            self.accountInfo = AccountInfo(
                imageUrl: data.imageUrl ?? "",
                userName: data.memeberLoginId
            )
        }
    }
    
    func sendAccountInfo() -> AccountInfo? {
        return self.accountInfo
    }
}
