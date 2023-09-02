//
//  LocationDTO.swift
//  SecondHand
//
//  Created by Wood on 2023/08/25.
//

import Foundation

struct UserLocationDTO: DTO {
    struct Location: Codable {
        var locationIdx: Int
        var locationName: String
    }

    struct UserLocation: Codable {
        var main: Location
        var sub: Location?
    }

    var success: Bool
    var status: Int
    var code: Int
    var message: String
    var data: UserLocation
}
