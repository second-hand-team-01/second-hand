package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.interest.InterestCheckRequestDto;
import codesquad.secondhand.dto.item.ItemDetailDto;
import codesquad.secondhand.dto.item.ItemDetailReturnDto;
import codesquad.secondhand.dto.item.ItemIdxDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.service.InterestService;
import codesquad.secondhand.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {
	public static final int END_PAGE = 10;
	private final ItemService itemService;
	private final InterestService interestService;

	@GetMapping
	public ResponseDto<ItemSliceDto> showItems(HttpServletRequest request, @RequestParam Long locationIdx,
		@RequestParam(defaultValue = "0") int page) {
		log.info("[ItemController.showItems()]");
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		Pageable pageable = PageRequest.of(page, END_PAGE, Sort.by("postedAt").descending());
		if (memberIdx == null) { // 로그인 하지 않은 사용자 분기 처리
			locationIdx = 1L;
		}
		ItemSliceDto itemSliceDto = itemService.showItems(memberIdx, locationIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	@GetMapping("/category/{categoryIdx}")
	public ResponseDto<ItemSliceDto> filterItems(HttpServletRequest request, @PathVariable Long categoryIdx,
		@RequestParam(defaultValue = "0") int page) {
		Pageable pageable = PageRequest.of(page, END_PAGE, Sort.by("postedAt").descending());
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		ItemSliceDto itemSliceDto = itemService.filterItems(memberIdx, categoryIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	@PostMapping
	public ResponseDto<ItemIdxDto> addItem(HttpServletRequest httpServletRequest,
		ItemDetailDto itemDetailDto) {
		log.info("addItem call" + itemDetailDto);
		Long memberIdx = (Long)httpServletRequest.getAttribute("memberIdx");
		log.info(memberIdx.toString());
		itemDetailDto.setSellerIdx(memberIdx);
		ItemIdxDto itemIdxDto = itemService.creatItem(itemDetailDto);
		return ResponseDto.of(RESPONSE_SUCCESS, itemIdxDto);
	}

	@GetMapping("/{itemIdx}")
	public ResponseDto<ItemDetailReturnDto> showItemDetail(HttpServletRequest httpServletRequest,
		ItemIdxDto itemIdxDto) {
		ItemDetailReturnDto itemDetailReturnDto = itemService.showItemDetail(httpServletRequest,
			itemIdxDto.getItemIdx());
		return ResponseDto.of(RESPONSE_SUCCESS, itemDetailReturnDto);
	}

	@DeleteMapping("/{itemIdx}")
	public ResponseDto<?> deleteItem(HttpServletRequest httpServletRequest, ItemIdxDto itemIdxDto) {
		itemService.deleteItem(httpServletRequest, itemIdxDto);
		return ResponseDto.of(RESPONSE_SUCCESS, null);
	}

	@PutMapping
	public ResponseDto<?> checkOrCancelInterest(HttpServletRequest request,
		@RequestBody InterestCheckRequestDto interestCheckRequestDto) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		log.info("memberIdx: {}", memberIdx);
		log.info("interestCheckRequestDto: {}", interestCheckRequestDto.getItemIdx());
		log.info("interestCheckRequestDto: {}", interestCheckRequestDto.getInterestChecked());
		interestService.checkInterest(interestCheckRequestDto, memberIdx);
		return ResponseDto.of(RESPONSE_SUCCESS, null);
	}

	// @PatchMapping
	// public ResponseDto<ItemSliceDto> editItemDetail() {
	// 	return ResponseDto.of(RESPONSE_SUCCESS, null);
	// }
}
