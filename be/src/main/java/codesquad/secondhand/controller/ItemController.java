package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseDto;
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

	// TODO: page 상수처리
	@GetMapping
	public ResponseDto<ItemSliceDto> showItems(@RequestParam(required = false) Long locationIdx) {
		log.info("[ItemController.showItems()]");
		Pageable pageable = PageRequest.of(START_PAGE, END_PAGE);
		ItemSliceDto itemSliceDto = itemService.showItems(locationIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	@GetMapping("/{categoryIdx}")
	public ResponseDto<ItemSliceDto> filterItems(@PathVariable Long categoryIdx) {
		Pageable pageable = PageRequest.of(START_PAGE, END_PAGE);
		ItemSliceDto itemSliceDto = itemService.filterItems(categoryIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	// @GetMapping
	// public ResponseDto<ItemSliceDto> showCategoryItems() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
	//
	// @PostMapping
	// public ResponseDto<ItemSliceDto> addItem() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
	//
	// @GetMapping
	// public ResponseDto<ItemSliceDto> showItemDetail() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
	//
	// @PatchMapping
	// public ResponseDto<ItemSliceDto> editItemDetail() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
	//
	// @DeleteMapping
	// public ResponseDto<ItemSliceDto> deleteItem() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
	//
}
