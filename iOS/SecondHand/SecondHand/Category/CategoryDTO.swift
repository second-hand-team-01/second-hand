//
//  CategoryDTO.swift
//  SecondHand
//
//  Created by Wood on 2023/08/14.
//

import Foundation

struct CategoryDTO: DTO, Codable {
    struct CategoryData: Codable {
        var idx: Int
        var name: String
        var imgUrl: String
    }
    
    var success: Bool
    var status: Int
    var code: Int
    var message: String
    var data: [CategoryData]
}
