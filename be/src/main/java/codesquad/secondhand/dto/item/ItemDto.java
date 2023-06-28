package codesquad.secondhand.dto.item;

import java.time.LocalDateTime;

import codesquad.secondhand.entity.Item;
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
