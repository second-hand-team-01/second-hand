//
//  SceneDelegate.swift
//  SecondHand
//
//  Created by Wood on 2023/06/07.
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }
        
        let tabBarViewController = TabBarViewController()
        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = tabBarViewController
        window.makeKeyAndVisible()
        
        self.window = window
    }
    
    func scene(
        _ scene: UIScene,
        openURLContexts URLContexts: Set<UIOpenURLContext>
    ) {
        if let url = URLContexts.first?.url {
            let code = String(url.absoluteString.split(separator: "=")[1])
            OAuth.code = code
            print(OAuth.code)
        }
    }
}

struct OAuth {
    static var code = ""
}
