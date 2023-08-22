//
//  Log.swift
//  SecondHand
//
//  Created by Wood on 2023/06/25.
//

import OSLog

enum Level: String {
    case network = "Network"
    case repository = "Repository"
    case info = "Info"
    case local = "Local"
    case presentation = "Presentation"
}

struct LogManager {
    static let subsystem = "team01.SecondHand"
    
    static func generate(level: Level, _ logMessage: String) {
        let logger = Logger(subsystem: subsystem, category: level.rawValue)
        logger.error("\(logMessage)")
    }
}
