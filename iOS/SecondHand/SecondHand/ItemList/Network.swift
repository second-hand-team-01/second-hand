//
//  Network.swift
//  SecondHand
//
//  Created by apple on 2023/06/19.
//

import Foundation

class Network {
    var ispagination = false
    func fetchData(index: Int, pagination: Bool = false, complete: @escaping (Result<[Item], Error>) -> Void) {
        self.ispagination = true
        DispatchQueue.global().asyncAfter(deadline: .now() + 1, execute: {
            complete(.success(Item.addSampleData(from: index)))
            self.ispagination = false
        })
    }
}
