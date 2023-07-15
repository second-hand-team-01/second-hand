//
//  DTO.swift
//  SecondHand
//
//  Created by Wood on 2023/06/29.
//

import Foundation

protocol DTO: Codable {
    var success: Bool { get }
    var status: Int { get }
    var code: Int { get }
    var message: String { get }
}
