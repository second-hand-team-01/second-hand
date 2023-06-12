//
//  SceneDelegate.swift
//  SecondHand
//
//  Created by Wood on 2023/06/07.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions
    ) {

        guard let windowScene = (scene as? UIWindowScene) else { return }
        let window = UIWindow(windowScene: windowScene)
        let listViewController = UINavigationController(rootViewController: ViewController())

        let tabBarController = UITabBarController()
        tabBarController.setViewControllers([listViewController], animated: true)
        window.rootViewController = tabBarController
        window.makeKeyAndVisible()
        self.window = window
    }
}
