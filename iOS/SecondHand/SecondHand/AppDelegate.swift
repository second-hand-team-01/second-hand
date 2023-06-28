//
//  AppDelegate.swift
//  SecondHand
//
//  Created by Wood on 2023/06/07.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey : Any] = [:])
    -> Bool {
        print("AppDelegate: \(options)")
        print("AppDelegate: \(url)")
        return true
    }
}
