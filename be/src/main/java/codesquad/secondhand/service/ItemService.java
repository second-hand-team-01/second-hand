package codesquad.secondhand.service;

import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.repository.ChatRoomRepository;
import codesquad.secondhand.repository.InterestRepository;
import codesquad.secondhand.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final InterestRepository interestRepository;

    public List<ItemDto> showItems(Long locationIdx) {
        log.info("[ItemService.showItems()]");
        List<Item> items = itemRepository.findByLocationLocationIdx(locationIdx);
        return items.stream()
                .map(item -> {
                    String imageUrl = null;
                    if (item.getItemImage() != null) {
                        imageUrl = item.getItemImage().getImageUrl();
                    }
                    return ItemDto.of(item, imageUrl, chatRoomRepository.countByItem(item), interestRepository.countByItem(item));
                })
                .collect(Collectors.toList());
    }

}
