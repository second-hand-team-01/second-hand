package codesquad.secondhand.service;

import static codesquad.secondhand.exception.code.ItemErrorCode.*;
import static codesquad.secondhand.exception.code.MemberErrorCode.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.secondhand.dto.interest.InterestCheckRequestDto;
import codesquad.secondhand.entity.Interest;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.repository.InterestRepository;
import codesquad.secondhand.repository.ItemRepository;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class InterestService {

	private final MemberRepository memberRepository;
	private final InterestRepository interestRepository;
	private final ItemRepository itemRepository;

	public void checkInterest(InterestCheckRequestDto interestCheckRequestDto, Long memberIdx) {
		Member member = memberRepository.findById(memberIdx)
			.orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
		Item item = itemRepository.findById(interestCheckRequestDto.getItemIdx())
			.orElseThrow(() -> new RestApiException(NO_EXISTING_ITEM));
		if (interestCheckRequestDto.getInterestChecked()) { // 추가
			interestRepository.save(Interest.of(member, item));
			return;
		}
		interestRepository.deleteByMemberIdAndItemId(memberIdx, item.getItemIdx());
	}

}
