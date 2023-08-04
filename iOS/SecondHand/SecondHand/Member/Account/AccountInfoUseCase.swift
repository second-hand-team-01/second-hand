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
    private var accountInfo: AccountInfo
    private var networkManager: AccountInfoNetworkManager
    
    init() {
        self.accountInfo = AccountInfo(imageUrl: "", userName: "")
        self.networkManager = AccountInfoNetworkManager()
    }
    
    func loadData(_ data: SignInResponseDTO.MemberInfo) {
        self.accountInfo.imageUrl = data.imgUrl ?? ""
        self.accountInfo.userName = data.loginId
    }
    
    func sendAccountInfo() -> AccountInfo {
        return self.accountInfo
    }
}
