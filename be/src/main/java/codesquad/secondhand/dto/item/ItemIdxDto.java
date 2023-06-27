package codesquad.secondhand.dto.item;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ItemIdxDto {

	private final Long itemIdx;

	public int of(ItemDetailDto itemDetailDto) {
		return new ItemIdxDto(itemDetailDto.getLocationIdx());
	}
}
