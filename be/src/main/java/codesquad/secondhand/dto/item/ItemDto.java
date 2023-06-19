package codesquad.secondhand.dto.item;

import codesquad.secondhand.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

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

    public static ItemDto of(Item item, int chatRooms, int interests) {
        return new ItemDto(item.getItemIdx(),
                item.getItemImage().getImageUrl(),
                item.getName(),
                item.getLocation().getTown(),
                item.getPostedAt(),
                item.getStatus(),
                item.getPrice(),
                chatRooms,
                interests);
    }

}
