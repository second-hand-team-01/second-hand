package codesquad.secondhand.dto.item;

import java.util.List;

import codesquad.secondhand.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public class ItemDetailDto {

	@Setter
	private Long sellerIdx;
	private final String name;
	private final Integer price;
	private final String description;
	private final Long locationIdx;
	private final Long categoryIdx;
	private final List<String> image;

	public static Item toEntity(ItemDetailDto itemDetailDto) {
		return Item.builder().itemIdx(itemDetailDto.getSellerIdx()).
		// return new Item(itemDetailDto.getSellerIdx(),
		// 	itemDetailDto.getCategoryIdx(),
		// 	itemDetailDto.getLocationIdx(),
		// 	null,
		// 	itemDetailDto.getDescription(),
		// 	itemDetailDto.getPrice(),
		// 	)
	}
}
