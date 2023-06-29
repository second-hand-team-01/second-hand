package codesquad.secondhand.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.secondhand.dto.category.CategoryWithoutImageDto;
import codesquad.secondhand.dto.item.ItemDetailDto;
import codesquad.secondhand.dto.item.ItemDetailReturnDto;
import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.dto.item.ItemIdxDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.dto.item.SellerDto;
import codesquad.secondhand.entity.Category;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.entity.ItemImage;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.exception.code.ItemErrorCode;
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

	public List<ItemDto> getListItemDto(Slice<Item> itemSlice, Long memberIdx) {
		return itemSlice.getContent().stream()
			.map(item -> {
				int chatRooms = chatRoomRepository.countByItem(item);
				int interests = interestRepository.countByItem(item);
				boolean interestChecked = interestRepository.existsByItemAndMember_MemberIdx(item, memberIdx);
				return ItemDto.of(item, chatRooms, interests, interestChecked);
			})
			.collect(Collectors.toList());
	}

	public ItemSliceDto showItems(Long memberIdx, Long locationIdx, Pageable pageable) {
		log.info("[ItemService.showItems()]");
		Slice<Item> itemSlice = itemRepository.findByLocationLocationIdx(locationIdx, pageable);
		List<ItemDto> itemDtos = getListItemDto(itemSlice, memberIdx);
		return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
	}

	public ItemSliceDto filterItems(Long memberIdx, Long categoryIdx, Pageable pageable) {
		Slice<Item> itemSlice = itemRepository.findItemByCategoryCategoryIdx(categoryIdx, pageable);
		List<ItemDto> itemDtos = getListItemDto(itemSlice, memberIdx);
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
			if (i == 0) {
				ItemImage itemImage = itemImageRepository.save(new ItemImage(save, itemUrlList.get(i)));
				item.setItemImage(itemImage);
				continue;
			}
			itemImageRepository.save(new ItemImage(save, itemUrlList.get(i)));
		}
		return new ItemIdxDto(item.getItemIdx());
	}

	public ItemDetailReturnDto showItemDetail(HttpServletRequest httpServletRequest, Long itemIdx) {
		Item item = itemRepository.findById(itemIdx)
			.orElseThrow();

		Long memberIdx;
		if (httpServletRequest.getAttribute("memberIdx") == null) {
			memberIdx = -1L;
		} else {
			memberIdx = (Long)httpServletRequest.getAttribute("memberIdx");
		}

		int view;
		if (memberIdx.equals(-1L) || !memberIdx.equals(item.getSeller().getMemberIdx())) {
			view = item.getView();
			item.setView(++view);
		}

		int chatRooms = interestRepository.countByItem(item);
		int interest = chatRoomRepository.countByItem(item);
		boolean interestChecked = interestRepository.existsByItemAndMember_MemberIdx(item, memberIdx);

		SellerDto sellerDto = SellerDto.to(memberRepository.findByMemberIdx(item.getSeller().getMemberIdx())
			.orElseThrow());
		CategoryWithoutImageDto categoryWithoutImageDto = CategoryWithoutImageDto.of(
			categoryRepository.findById(item.getCategory().getCategoryIdx())
				.orElseThrow());
		List<String> imageUrl = itemImageRepository.findAllByItemItemIdx(itemIdx).stream()
			.map(ItemImage::getImageUrl).collect(Collectors.toList());

		return ItemDetailReturnDto.of(item, sellerDto, categoryWithoutImageDto, chatRooms, interest, interestChecked,
			imageUrl);
	}

	public void deleteItem(HttpServletRequest httpServletRequest, ItemIdxDto itemIdxDto) {
		Item item = itemRepository.findById(itemIdxDto.getItemIdx())
			.orElseThrow();

		Long memberIdx;
		if (httpServletRequest.getAttribute("memberIdx") == null) {
			memberIdx = -1L;
		} else {
			memberIdx = (Long)httpServletRequest.getAttribute("memberIdx");
		}

		if (memberIdx.equals(item.getSeller().getMemberIdx())) {
			itemRepository.delete(item);
		} else {
			throw new RestApiException(ItemErrorCode.UnauthorizedException);
		}
	}
}
