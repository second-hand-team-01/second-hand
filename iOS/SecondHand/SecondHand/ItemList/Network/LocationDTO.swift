//
//  LocationDTO.swift
//  SecondHand
//
//  Created by Wood on 2023/08/25.
//

import Foundation

struct UserLocationDTO: DTO {
    struct UserLocation: Codable {
        struct Main: Codable {
            var locationIdx: Int
            var locationName: String
        }
        
        struct Sub: Codable {
            var locationIdx: Int?
            var locationName: String?
        }
        
        var main: Main
        var sub: Sub
    }


    var success: Bool
    var status: Int
    var code: Int
    var message: String
    var data: UserLocation
}
