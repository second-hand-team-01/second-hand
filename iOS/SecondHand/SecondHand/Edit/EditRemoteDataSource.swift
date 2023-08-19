//
//  EditNetworkManager.swift
//  SecondHand
//
//  Created by Wood on 2023/08/17.
//

import Foundation

struct ImageFile {
    let filename: String
    let data: Data
    let type: String
}

final class EditRemoteDataSource {
    private var shared = URLSession.shared
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()
    var itemIndex: Int
    private let baseURLString: String
    
    init(itemIndex: Int) {
        self.itemIndex = itemIndex
        self.baseURLString = ServerURL.base + String(itemIndex)
    }
    
    private func createRequest(url: URL, isEdit: Bool) -> URLRequest {
        var request = URLRequest(url: url)
        request.setValue("Bearer \(SecretKeys.accessToken)", forHTTPHeaderField: "Authorization")
        request.httpMethod = isEdit ? "PUT" : "POST"
        let boundary = "Boundary-\(UUID().uuidString)"
        request.setValue(
            "multipart/form-data; boundary=\(boundary)",
            forHTTPHeaderField: "Content-Type"
        )

        return request
    }
    
    private func createParameters(from editModel: EditModel) -> [String: Any] {
        var parameters: [String: Any] = [:]
        parameters["name"]          = editModel.name
        parameters["price"]         = editModel.price
        parameters["description"]   = editModel.description
        parameters["locationIdx"]   = editModel.locationIndex
        parameters["categoryIdx"]   = editModel.categoryIndex
        parameters["status"]        = editModel.status
        
        return parameters
    }
    
    private func createBody(with parameters: [String: Any]) -> Data {
        var body = Data()
        for (key, value) in parameters {
            body.append("--\(UUID().uuidString)\r\n".data(using: .utf8) ?? Data())
            let contentDisposition = "Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n".data(using: .utf8) ?? Data()
            body.append(contentDisposition)
            body.append("\(value)\r\n".data(using: .utf8) ?? Data())
        }
        
        return body
    }
    
    private func createImageToString(from imageKeys: [NSString]) -> [Data] {
        var imagesData: [Data] = []
        imageKeys.forEach { (key: NSString) in
            guard let imageData = DataCacheManager.find(by: key) else {
                return
            }
            imagesData.append(imageData.base64EncodedData())
        }
        DataCacheManager.shared.removeAllObjects()
        return imagesData
    }
    
    private func add(imagesData: [Data], to body: Data) -> Data {
        var body = body
        imagesData.enumerated().forEach { (index: Int, imageData: Data) in
            body.append("--\(UUID().uuidString)\r\n".data(using: .utf8) ?? Data())
            body.append("Content-Disposition: form-data; name=\"image\(index)\"; filename=\"image\(index).jpeg\"\r\n".data(using: .utf8) ?? Data())
            body.append("Content-Type: image/jpeg\r\n\r\n".data(using: .utf8) ?? Data())
            body.append(imageData)
            body.append("\r\n".data(using: .utf8) ?? Data())
        }
        body.append("--\(UUID().uuidString)--\r\n".data(using: .utf8) ?? Data())
        
        return body
    }
    
    private func createBody(with editModel: EditModel, isEdit: Bool) -> Data {
        let parameters = self.createParameters(from: editModel)
        var body = self.createBody(with: parameters)

        if isEdit == false {
            let imagesData = self.createImageToString(from: editModel.imageKeys)
            body = self.add(imagesData: imagesData, to: body)
        }

        return body
    }
    
    // MARK: - Create
    
    struct CreateResponseDTO: DTO {
        struct Data: Codable {
            var itemIdx: Int
        }
        var success: Bool
        var status: Int
        var code: Int
        var message: String
        var data: Data
    }
    
    func createProduct(editModel: EditModel) async -> Bool {
        guard let url = URL(string: ServerURL.base) else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return false
        }

        var request = self.createRequest(url: url, isEdit: false)
        let body = self.createBody(with: editModel, isEdit: false)
        request.httpBody = body
        
        do {
            let (data, urlResponse) = try await shared.data(for: request)
            
            guard URLResponse.validate(urlResponse) else {
                return false
            }
            
            let createResponse = try self.decoder.decode(CreateResponseDTO.self, from: data)
            return true

        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }
            LogManager.generate(level: .network, "\(error)")
            return false
        }
    }
    
    // MARK: - Edit
    
    func editProduct(editModel: EditModel) async -> Bool {
        guard let url = URL(string: self.baseURLString) else {
            LogManager.generate(level: .network, NetworkError.badURL.message)
            return false
        }
        
        var request = self.createRequest(url: url, isEdit: false)
        let body = self.createBody(with: editModel, isEdit: true)
        request.httpBody = body
        
        do {
            let (data, urlResponse) = try await shared.data(for: request)
            
            guard URLResponse.validate(urlResponse) else {
                return false
            }
            
            if let result = try? self.decoder.decode(GeneralDTO.self, from: data) {
                return true
            }
            return false
        } catch let error {
            if let decodingError = error as? DecodingError {
                LogManager.generate(level: .network, "\(decodingError)")
            }
            LogManager.generate(level: .network, "\(error)")
            return false
        }
    }
}
