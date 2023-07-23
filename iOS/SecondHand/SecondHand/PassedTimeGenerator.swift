//
//  PassedTimeGenerator.swift
//  SecondHand
//
//  Created by Wood on 2023/07/22.
//

import Foundation

struct PassedTimeGenerator {
    static private let formatter: DateFormatter = {
        let dateFormatter = DateFormatter()
        let koreanInterval = 32400
        dateFormatter.timeZone = TimeZone(secondsFromGMT: koreanInterval)
        let dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        dateFormatter.dateFormat = dateFormat
        return dateFormatter
    }()
    
    private init() {}
    
    static func generate(from: String) -> String {
        print(from)
        guard let formattedInputTime = formatter.date(from: from) else {
            return ""
        }
        
        let now = Date()
        var interval = Int(formattedInputTime.distance(to: now))
        guard (interval / 60) > 0 else {
            return "\(interval)초 전"
        }
        
        interval /= 60
        guard (interval / 60) > 0 else {
            return "\(interval)분 전"
        }
        
        interval /= 60
        guard (interval / 24) > 0 else {
            return "\(interval)시간 전"
        }
        
        interval /= 24
        guard (interval / 30) > 0 else {
            return "\(interval)일 전"
        }
        
        interval /= 30
        guard (interval / 12) > 0 else {
            return "\(interval)달 전"
        }
        
        interval /= 12
        return "\(interval)년 전"
    }
}

// calculate 메소드 코드라인 줄이는데 사용할 예정.
//enum TimeScale {
//    case second
//    case minute
//    case hour
//    case day
//    case month
//
//    var boundary: Int {
//        switch self {
//        case .second:
//            return 60
//        case .minute:
//            return 60
//        case .hour:
//            return 24
//        case .day:
//            return 30
//        case .month:
//            return 12
//        }
//    }
//}
