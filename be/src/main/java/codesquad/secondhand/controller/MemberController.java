package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.ResponseListDto;
import codesquad.secondhand.dto.category.CategoryWithoutImageDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.dto.location.MainSubDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.dto.member.LoginRequestDto;
import codesquad.secondhand.dto.member.MemberIdxLoginIdDto;
import codesquad.secondhand.dto.member.MemberIdxTokenDto;
import codesquad.secondhand.dto.member.MemberInfoDto;
import codesquad.secondhand.dto.member.SignUpRequestDto;
import codesquad.secondhand.dto.token.TokenResponse;
import codesquad.secondhand.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/signup")
	public ResponseDto<?> signUp(@ModelAttribute SignUpRequestDto signUpRequestDto) {
		memberService.signUp(signUpRequestDto);
		return ResponseDto.of(RESPONSE_SUCCESS, null);
	}

	@PostMapping("/login")
	public ResponseDto<TokenResponse> login(@RequestBody LoginRequestDto loginRequestDto) {
		MemberIdxTokenDto memberIdxTokenDto = memberService.login(loginRequestDto);
		MemberIdxLoginIdDto memberIdxLoginId = memberService.getMemberIdxLoginId(memberIdxTokenDto.getMemberIdx());
		String accessToken = memberIdxTokenDto.getToken();
		return ResponseDto.of(RESPONSE_SUCCESS, TokenResponse.of(accessToken, memberIdxLoginId));
	}

	@GetMapping("/info")
	public ResponseDto<MemberInfoDto> showMemberInfo(HttpServletRequest request) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		MemberInfoDto memberInfo = memberService.getMemberInfo(memberIdx);
		return ResponseDto.of(RESPONSE_SUCCESS, memberInfo);
	}

	@GetMapping("/location")
	public ResponseDto<MainSubTownDto> showMemberLocations(HttpServletRequest request) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		MainSubTownDto mainSubTownDto = memberService.getMainSubLocation(memberIdx);
		return ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto);
	}

	@PutMapping("/location")
	public ResponseDto<MainSubTownDto> updateMemberLocations(@RequestBody MainSubDto mainSubDto,
		HttpServletRequest request) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		MainSubTownDto mainSubTownDto = memberService.updateMainSubLocation(memberIdx, mainSubDto);
		return ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto);
	}

	@GetMapping("/members/items")
	public ResponseDto<ItemSliceDto> showSellingItems(@RequestParam(required = true) String status,
		@RequestParam(defaultValue = "0") int page,
		HttpServletRequest request) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		Pageable pageable = PageRequest.of(page, 10);
		ItemSliceDto itemSliceDto = memberService.showSellerItems(memberIdx, status, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}

	@GetMapping("/members/interest/category")
	public ResponseListDto<CategoryWithoutImageDto> extractCategories(HttpServletRequest request) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		List<CategoryWithoutImageDto> categories = memberService.extractCategories(memberIdx);
		return ResponseListDto.of(RESPONSE_SUCCESS, categories);
	}

	@GetMapping("/members/interest")
	public ResponseDto<ItemSliceDto> showInterestedItems(HttpServletRequest request,
		@RequestParam(required = false) Long categoryIdx) {
		Long memberIdx = (Long)request.getAttribute("memberIdx");
		Pageable pageable = PageRequest.of(0, 10);
		if (categoryIdx == null) { // categoryIdx가 null로 들어오면 전체 상품 조회
			log.info("categoryIdx: {}", categoryIdx);
			ItemSliceDto itemSliceDto = memberService.showInterestedItems(memberIdx, pageable);
			return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
		}
		ItemSliceDto itemSliceDto = memberService.showInterestedItems(memberIdx, categoryIdx, pageable);
		return ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto);
	}
}
