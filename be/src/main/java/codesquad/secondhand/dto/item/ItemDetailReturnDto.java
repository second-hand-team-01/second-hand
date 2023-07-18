package codesquad.secondhand.dto.item;

import java.time.LocalDateTime;
import java.util.List;

import codesquad.secondhand.dto.category.CategoryWithoutImageDto;
import codesquad.secondhand.entity.Item;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ItemDetailReturnDto {

	private final Long itemIdx;
	private final String name;
	private final SellerDto seller;
	private final String status;
	private final CategoryWithoutImageDto category;
	private final String description;
	private final Integer price;
	private final int chat;
	private final int interest;
	private final int view;
	private final boolean interestChecked;
	private final LocalDateTime lastModifiedAt;
	private final List<String> imageUrl;

	public static ItemDetailReturnDto of(Item item, SellerDto sellerDto,
		CategoryWithoutImageDto categoryWithoutImageDto,
		int chat, int interest, boolean interestChecked, List<String> itemImage) {
		return new ItemDetailReturnDto(item.getItemIdx(), item.getName(), sellerDto, item.getStatus(),
			categoryWithoutImageDto,
			item.getDescription(), item.getPrice(), chat, interest, item.getView(), interestChecked, item.getLastModifiedAt(),
			itemImage);
	}
}
