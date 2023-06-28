package codesquad.secondhand.service;

import static codesquad.secondhand.exception.code.MemberErrorCode.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import codesquad.secondhand.dto.category.CategoryWithoutImageDto;
import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.dto.location.MainSubDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.dto.member.LoginRequestDto;
import codesquad.secondhand.dto.member.MemberIdxLoginIdDto;
import codesquad.secondhand.dto.member.MemberIdxTokenDto;
import codesquad.secondhand.dto.member.MemberImageDto;
import codesquad.secondhand.dto.member.MemberInfoDto;
import codesquad.secondhand.dto.member.SaveMemberDto;
import codesquad.secondhand.dto.member.SignUpRequestDto;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.jwt.JwtTokenProvider;
import codesquad.secondhand.repository.CategoryRepository;
import codesquad.secondhand.repository.ChatRoomRepository;
import codesquad.secondhand.repository.InterestRepository;
import codesquad.secondhand.repository.ItemRepository;
import codesquad.secondhand.repository.LocationRepository;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

	public static final int MEMBER_IMAGE_PATH = 0;
	public static final int MEMBER_IMAGE_URL = 1;
	private final ItemRepository itemRepository;
	private final MemberRepository memberRepository;
	private final LocationRepository locationRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final InterestRepository interestRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final ImageService imageService;
	private final CategoryRepository categoryRepository;

	public void signUp(SignUpRequestDto signUpRequestDto) {
		memberRepository.findByLoginId(signUpRequestDto.getLoginId()) // ID 중복 검사
			.ifPresent(member -> { // 중복 시 SAME_ID_ALREADY_EXISTS 예외
				throw new RestApiException(SAME_ID_ALREADY_EXISTS);
			});

		String[] memberProfileUrl = imageService.upload(signUpRequestDto.getImage(), signUpRequestDto.getLoginId())
			.split("@");

		Location main = locationRepository.findById(signUpRequestDto.getMainLocationIdx()).orElseThrow();
		Location sub = locationRepository.findById(signUpRequestDto.getSubLocationIdx()).orElseThrow();
		SaveMemberDto saveMemberDto = SaveMemberDto.of(signUpRequestDto, memberProfileUrl[MEMBER_IMAGE_PATH],
			memberProfileUrl[MEMBER_IMAGE_URL], main, sub);
		memberRepository.save(Member.of(saveMemberDto));
	}

	public MemberIdxTokenDto login(LoginRequestDto loginRequestDto) {
		Member member = memberRepository.findByLoginId(loginRequestDto.getLoginId())
			.orElseThrow(() -> new RestApiException(REQUIRED_SIGNUP));
		if (!loginRequestDto.getPassword().equals(member.getPassword())) { // 비밀번호 불일치 시
			//TODO: 비밀번호 해시 함수를 사용해 암호화 해보기
			throw new RestApiException(WRONG_PASSWORD);
		}
		String token = jwtTokenProvider.createToken(getMemberIdxLoginId(member.getMemberIdx()));
		return MemberIdxTokenDto.of(member.getMemberIdx(), token);
	}

	public MainSubTownDto updateMainSubLocation(Long memberIdx, MainSubDto mainSubDto) {
		Member member = memberRepository.findById(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));

		Location newSubLocation = null;

		Location newMainLocation = locationRepository.findById(mainSubDto.getMain().getLocationIdx())
			.orElseThrow(IllegalArgumentException::new);
		if (mainSubDto.getSub() != null) {
			newSubLocation = locationRepository.findById(mainSubDto.getSub().getLocationIdx())
				.orElseThrow(IllegalArgumentException::new);
		}
		member.updateLocations(newMainLocation, newSubLocation);
		return MainSubTownDto.of(member);
	}

	public ItemSliceDto showSellerItems(Long sellerIdx, String status, Pageable pageable) {
		log.debug("[MemberService.showSellerItems()]");
		log.debug("sellerIdx: {}", sellerIdx);
		Slice<Item> itemSlice = itemRepository.findBySellerIdxAndStatus(sellerIdx, status, pageable);
		List<ItemDto> itemDtos = itemSlice.getContent().stream()
			.map(item -> {
				int chatRooms = chatRoomRepository.countByItem(item);
				int interests = interestRepository.countByItem(item);
				boolean interestChecked = interestRepository.existsByItemAndMember_MemberIdx(item, sellerIdx);
				return ItemDto.of(item, chatRooms, interests, interestChecked);
			})
			.collect(Collectors.toList());

		return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
	}

	public ItemSliceDto showInterestedItems(Long sellerIdx, Long categoryIdx, Pageable pageable) {
		log.debug("[MemberService.showInterestedItems()]");
		Slice<Item> itemSlice = itemRepository.findItemAndCategoryByMemberAndCategory(sellerIdx, categoryIdx, pageable);
		List<ItemDto> itemDtos = itemSlice.getContent().stream()
			.map(item -> {
				int chatRooms = chatRoomRepository.countByItem(item);
				int interests = interestRepository.countByItem(item);
				boolean interestChecked = interestRepository.existsByItemAndMember_MemberIdx(item, sellerIdx);
				return ItemDto.of(item, chatRooms, interests, interestChecked);
			})
			.collect(Collectors.toList());

		return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
	}


	public ItemSliceDto showInterestedItems(Long sellerIdx, Pageable pageable) {
		log.debug("[MemberService.showInterestedItems()]");
		Slice<Item> itemSlice = itemRepository.findItemsBySellerInterest(sellerIdx, pageable);
		List<ItemDto> itemDtos = itemSlice.getContent().stream()
			.map(item -> {
				int chatRooms = chatRoomRepository.countByItem(item);
				int interests = interestRepository.countByItem(item);
				boolean interestChecked = interestRepository.existsByItemAndMember_MemberIdx(item, sellerIdx);
				return ItemDto.of(item, chatRooms, interests, interestChecked);
			})
			.collect(Collectors.toList());

		return new ItemSliceDto(itemSlice.hasNext(), itemDtos);
	}

	public List<CategoryWithoutImageDto> extractCategories(Long sellerIdx) {
		List<Long> categoryIndexes = itemRepository.findDistinctCategoryIdxByMemberIdx(sellerIdx);
		return categoryIndexes.stream()
			.map(categoryIdx -> categoryRepository.findById(categoryIdx)
				.map(CategoryWithoutImageDto::of)
				.get())
			.collect(Collectors.toList());
	}

	public MemberIdxLoginIdDto getMemberIdxLoginId(Long memberIdx) {
		Member member = memberRepository.findById(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
		return MemberIdxLoginIdDto.of(member);
	}

	public MemberInfoDto getMemberInfo(Long memberIdx) {
		Member member = memberRepository.findById(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
		return MemberInfoDto.of(member);
	}

	public MainSubTownDto getMainSubLocation(Long memberIdx) { // mainLocation, subLocation 동시에 가져오는 메서드
		Member member = memberRepository.findById(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
		return MainSubTownDto.of(member);
	}

	public MemberImageDto editMemberProfileImage(Long memberIdx, MultipartFile image) {
		Member member = memberRepository.findByMemberIdx(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));

		imageService.delete(member.getImagePath());
		imageService.upload(image, member.getLoginId());

		memberRepository.save(member);
		return MemberImageDto.of(member);
	}

}
