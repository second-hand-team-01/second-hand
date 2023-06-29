package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.item.ItemDetailDto;
import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.dto.item.ItemIdxDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {
	public static final int START_PAGE = 0;
	public static final int END_PAGE = 10;
	private final ItemService itemService;

	@GetMapping
	public ResponseDto<ItemSliceDto> showItems(HttpServletRequest request, @RequestParam Long locationIdx) {
		log.info("[ItemController.showItems()]");
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		Pageable pageable = PageRequest.of(START_PAGE, END_PAGE);
		if (memberIdx == null) { // 로그인 하지 않은 사용자 분기 처리
			locationIdx = 1L;
		}
		ItemSliceDto itemSliceDto = itemService.showItems(memberIdx, locationIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	@GetMapping("/category/{categoryIdx}")
	public ResponseDto<ItemSliceDto> filterItems(HttpServletRequest request, @PathVariable Long categoryIdx) {
		Pageable pageable = PageRequest.of(START_PAGE, END_PAGE);
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		ItemSliceDto itemSliceDto = itemService.filterItems(memberIdx, categoryIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	@PostMapping
	public ResponseDto<ItemIdxDto> addItem(HttpServletRequest httpServletRequest,
		@ModelAttribute ItemDetailDto itemDetailDto) {
		log.info("addItem call" + itemDetailDto);
		Long memberIdx = (Long)httpServletRequest.getAttribute("memberIdx");
		itemDetailDto.setSellerIdx(memberIdx);
		ItemIdxDto itemIdxDto = itemService.creatItem(itemDetailDto);
		return ResponseDto.of(RESPONSE_SUCCESS, itemIdxDto);
	}

	@GetMapping("/{itemIdx}")
	// TODO: 조회수
	public ResponseDto<ItemDto> showItemDetail(HttpServletRequest httpServletRequest,
		ItemIdxDto itemIdxDto) {
		ItemDto itemDto = itemService.showItemDetail(httpServletRequest, itemIdxDto.getItemIdx());
		return ResponseDto.of(RESPONSE_SUCCESS, itemDto);
	}

	// @PatchMapping
	// public ResponseDto<ItemSliceDto> editItemDetail() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
	//
	// @DeleteMapping
	// public ResponseDto<ItemSliceDto> deleteItem() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }

}
