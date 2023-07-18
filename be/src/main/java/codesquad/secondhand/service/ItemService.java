package codesquad.secondhand.service;

import static codesquad.secondhand.exception.code.ItemErrorCode.*;
import static codesquad.secondhand.exception.code.MemberErrorCode.*;

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

	public ItemSliceDto filterItems(Long locationIdx, Long memberIdx, Long categoryIdx, Pageable pageable) {
		Slice<Item> itemSlice = itemRepository.findItemByCategoryCategoryIdxAndLocationLocationIdx(categoryIdx,
			locationIdx, pageable);
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
			String[] imageSplit = itemUrlList.get(i).split("@");
			if (i == 0) {
				ItemImage itemImage = itemImageRepository.save(new ItemImage(save, imageSplit[1], imageSplit[0]));
				item.setItemImage(itemImage);
				continue;
			}
			itemImageRepository.save(new ItemImage(save, imageSplit[1], imageSplit[0]));
		}
		return new ItemIdxDto(item.getItemIdx());
	}

	public ItemIdxDto editItem(Long memberIdx, Long itemIdx, ItemDetailDto itemDetailDto) {
		Member member = memberRepository.findById(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
		Item itemToEdit = itemRepository.findById(itemIdx).orElseThrow(() -> new RestApiException(NO_EXISTING_ITEM));
		if (itemToEdit.getSeller().getMemberIdx() != memberIdx) {
			log.info("itemDetailDto.getSellerIdx:{}", itemDetailDto.getSellerIdx());
			throw new RestApiException(UNAUTHORIZED_EXCEPTION_EDIT);
		}
		Category category = null;
		if (itemDetailDto.getCategoryIdx() != null) {
			category = categoryRepository.findById(itemDetailDto.getCategoryIdx()).get();
		}
		Location location = null;
		if (itemDetailDto.getLocationIdx() != null) {
			location = locationRepository.findById(itemDetailDto.getLocationIdx()).get();
		}
		// TODO: 아이템 이미지 수정하기

		itemToEdit.updateItem(member, category, location, itemDetailDto.getName(), itemDetailDto.getDescription(),
			itemDetailDto.getPrice(),
			itemDetailDto.getStatus());
		return new ItemIdxDto(itemToEdit.getItemIdx());
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

		int interest = interestRepository.countByItem(item);
		int chatRooms = chatRoomRepository.countByItem(item);
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

		List<ItemImage> list = item.getItemImages();
		for (ItemImage itemImage : list) {
			imageService.delete(itemImage.getImagePath());
		}
		if (memberIdx.equals(item.getSeller().getMemberIdx())) {
			itemRepository.delete(item);
		} else {
			throw new RestApiException(UNAUTHORIZED_EXCEPTION_DELETE);
		}
	}
}
