//
//  ViewController.swift
//  SecondHand
//
//  Created by Wood on 2023/06/07.
//

import UIKit

class ViewController: UIViewController {
    var detailButton: UIButton?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        setDetailButton()
    }
    
    func setDetailButton() {
        let buttonSize = CGSize(width: 200, height: 50)
        detailButton = makeDetailButton(size: buttonSize)
        detailButton?.frame.origin = getCenterPoint(of: detailButton)
        addButtonToView(button: detailButton)
    }
    
    func makeDetailButton(size: CGSize) -> UIButton {
        let button = UIButton(frame: CGRect(origin: CGPoint(),
                                            size: size))

        button.setTitle("상세화면으로 이동", for: .normal)
        button.backgroundColor = .lightGray
        
        button.addTarget(self,
                         action: #selector(moveToDetail),
                         for: .touchUpInside)
        return button
    }
    
    @objc func moveToDetail(_ seneder: UIButton) {
        let viewController = DetailViewController()
        self.navigationController?.pushViewController(viewController, animated: true)
    }
    
    func addButtonToView(button: UIButton?) {
        guard let button = button else {
            return
        }
        self.view.addSubview(button)
    }

    func getCenterPoint(of view: UIView?) -> CGPoint {
        let screenframe = self.view.frame
        guard let frame = view?.frame else { return CGPoint() }
        let pointX = (screenframe.width / 2) - (frame.width / 2)
        let pointY = (screenframe.height / 2) - (frame.height / 2)
        
        return CGPoint(x: pointX, y: pointY)
    }
}
