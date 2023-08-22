//
//  EditRequestBody.swift
//  SecondHand
//
//  Created by Wood on 2023/08/18.
//

import Foundation

struct EditRequestBody: Encodable {
    let name: String
    let price: Int
    let description: String
    let locationIdx: Int
    let categoryIdx: Int
    let status: String
}
