package codesquad.secondhand.dto.item;

import java.time.LocalDateTime;

import codesquad.secondhand.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
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
}
