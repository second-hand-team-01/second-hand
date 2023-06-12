//
//  ItemListTableViewCell.swift
//  SecondHand
//
//  Created by apple on 2023/06/12.
//

import UIKit

class ItemListTableViewCell: UITableViewCell {
    static let identifier = "ItemListCell"
    
    var thumbnailImage: UIImageView = UIImageView()
    var titleLabel: UILabel = UILabel()
    var locationLabel: UILabel = UILabel()
    var writeTimeLabel: UILabel = UILabel()
    var stateLabel: CapsuleLabel = CapsuleLabel()
    var priceLabel: UILabel = UILabel()
    var commentCountLabel: PlusImageLabel = PlusImageLabel()
    var likeCountLabel: PlusImageLabel = PlusImageLabel()
    

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
