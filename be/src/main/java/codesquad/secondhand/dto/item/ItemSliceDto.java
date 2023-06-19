package codesquad.secondhand.dto.item;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ItemSliceDto {

    private final boolean hasNext;
    private final List<ItemDto> items;

    public static ItemSliceDto of(boolean hasNext, List<ItemDto> items) {
        return new ItemSliceDto(hasNext, items);
    }
}
