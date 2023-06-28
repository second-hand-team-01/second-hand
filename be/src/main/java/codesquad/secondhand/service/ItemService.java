package codesquad.secondhand.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.secondhand.dto.item.ItemDetailDto;
import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.dto.item.ItemIdxDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.entity.Category;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.entity.ItemImage;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.repository.CategoryRepository;
import codesquad.secondhand.repository.ChatRoomRepository;
import codesquad.secondhand.repository.InterestRepository;
import codesquad.secondhand.repository.ItemImageRepository;
import codesquad.secondhand.repository.ItemRepository;
import codesquad.secondhand.repository.LocationRepository;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final InterestRepository interestRepository;
	private final CategoryRepository categoryRepository;
	private final MemberRepository memberRepository;
	private final LocationRepository locationRepository;
	private final ItemImageRepository itemImageRepository;
	private final ImageService imageService;

	public List<ItemDto> getListItemDto(Slice<Item> itemSlice) {
		return itemSlice.getContent().stream()
			.map(item -> {
				int chatRooms = chatRoomRepository.countByItem(item);
				int interests = interestRepository.countByItem(item);
				return ItemDto.of(item, chatRooms, interests);
			})
			.collect(Collectors.toList());
	}

	public ItemSliceDto showItems(Long locationIdx, Pageable pageable) {
		log.info("[ItemService.showItems()]");
		Slice<Item> itemSlice = itemRepository.findByLocationLocationIdx(locationIdx, pageable);
		List<ItemDto> itemDtos = getListItemDto(itemSlice);
		return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
	}

	public ItemSliceDto filterItems(Long categoryIdx, Pageable pageable) {
		Slice<Item> itemSlice = itemRepository.findItemByCategoryCategoryIdx(categoryIdx, pageable);
		List<ItemDto> itemDtos = getListItemDto(itemSlice);
		return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
	}

	public ItemIdxDto creatItem(ItemDetailDto itemDetailDto) {
		log.info(itemDetailDto.toString());
		Category category = categoryRepository.findById(itemDetailDto.getCategoryIdx())
			.orElseThrow();
		Member member = memberRepository.findById(itemDetailDto.getSellerIdx())
			.orElseThrow();
		Location location = locationRepository.findById(itemDetailDto.getLocationIdx())
			.orElseThrow();
		Item item = new Item(member, category, location, null,
			itemDetailDto.getName(), itemDetailDto.getDescription(), itemDetailDto.getPrice(),
			0, "판매중");

		Item save = itemRepository.save(item);
		List<String> itemUrlList = imageService.upload(save.getItemIdx(), itemDetailDto);
		for (int i = 0; i < itemUrlList.size(); i++) {
			if(i == 0) {
				ItemImage itemImage = itemImageRepository.save(new ItemImage(save, itemUrlList.get(i)));
				item.setItemImage(itemImage);
				continue;
			}
			itemImageRepository.save(new ItemImage(save, itemUrlList.get(i)));
		}
		return new ItemIdxDto(item.getItemIdx());
	}

}
