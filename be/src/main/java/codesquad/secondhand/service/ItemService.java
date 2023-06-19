package codesquad.secondhand.service;

import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.repository.ChatRoomRepository;
import codesquad.secondhand.repository.InterestRepository;
import codesquad.secondhand.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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

    public ItemSliceDto showItems(Long locationIdx, Pageable pageable) {
        log.info("[ItemService.showItems()]");

        Slice<Item> itemSlice = itemRepository.findByLocationLocationIdx(locationIdx, pageable);

        List<ItemDto> itemDtos = itemSlice.getContent().stream()
                .map(item -> ItemDto.of(item, chatRoomRepository.countByItem(item), interestRepository.countByItem(item)))
                .collect(Collectors.toList());

        return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
    }

}
