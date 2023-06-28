package codesquad.secondhand.dto.item;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ItemSliceDto {

	private final boolean hasNext;
	private final List<ItemDto> items;

	public static ItemSliceDto of(boolean hasNext, List<ItemDto> items) {
		return new ItemSliceDto(hasNext, items);
	}
}
