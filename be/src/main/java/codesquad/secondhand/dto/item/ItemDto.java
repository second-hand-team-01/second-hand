package codesquad.secondhand.dto.item;

import java.time.LocalDateTime;
import java.util.List;

import codesquad.secondhand.entity.Category;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.entity.ItemImage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ItemDto {

	private Long itemIdx;
	private String imageUrl;
	private String name;
	private String location;
	private LocalDateTime postedAt;
	private String status;
	private Integer price;
	private int chat;
	private int interest;
	private boolean interestChecked;
	private Category category;
	private List<ItemImage> imageList;
	private int view;
	private String sellerId;

	public ItemDto(Long itemIdx, String imageUrl, String name, String location, LocalDateTime postedAt, String status,
		Integer price, int chat, int interest, boolean interestChecked) {
		this.itemIdx = itemIdx;
		this.imageUrl = imageUrl;
		this.name = name;
		this.location = location;
		this.postedAt = postedAt;
		this.status = status;
		this.price = price;
		this.chat = chat;
		this.interest = interest;
		this.interestChecked = interestChecked;
	}

	public static ItemDto of(Item item, int chatRooms, int interests, boolean interestChecked) {
		return new ItemDto(item.getItemIdx(),
			item.getItemImage().getImageUrl(),
			item.getName(),
			item.getLocation().getTown(),
			item.getPostedAt(),
			item.getStatus(),
			item.getPrice(),
			chatRooms,
			interests,
			interestChecked
		);
	}

	// public static ItemDto of(Item item, int chatRooms, int interests, boolean interestChecked, Integer view,
	// 	List<ItemImage> imageList, Category category) {
	// 	return new ItemDto(item.getItemIdx(),
	// 		item.getName(),
	// 		item.getSeller().getLoginId(),
	// 		item.getStatus(),
	// 		item.getLocation().getTown(),
	// 		item.getPostedAt(),
	// 		item.getPrice(),
	// 		chatRooms,
	// 		interests,
	// 		interestChecked,
	// 		category,
	// 		imageList,
	// 		view
	// 	);
	}
}
