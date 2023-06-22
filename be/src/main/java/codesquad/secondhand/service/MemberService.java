package codesquad.secondhand.service;

import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.dto.location.MainSubDto;
import codesquad.secondhand.dto.member.*;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.exception.code.MemberErrorCode;
import codesquad.secondhand.jwt.JwtTokenProvider;
import codesquad.secondhand.repository.LocationRepository;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static codesquad.secondhand.exception.code.MemberErrorCode.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public void signUp(SignUpRequestDto signUpRequestDto) {
        memberRepository.findByLoginId(signUpRequestDto.getLoginId()) // ID 중복 검사
                .ifPresent(member -> { // 중복 시 SAME_ID_ALREADY_EXISTS 예외
                    throw new RestApiException(SAME_ID_ALREADY_EXISTS);
                });
        /**
         * MultipartFile로 들어온 이미지가 URL로 변환되는 로직
         */
        String imageUrl = "example";
        Location main = locationRepository.findById(signUpRequestDto.getMainLocationIdx()).orElseThrow();
        Location sub = locationRepository.findById(signUpRequestDto.getSubLocationIdx()).orElseThrow();
        SaveMemberDto saveMemberDto = SaveMemberDto.of(signUpRequestDto, imageUrl, main, sub);
        memberRepository.save(Member.of(saveMemberDto));
    }

    public String createToken(LoginRequestDto loginRequestDto) {
        Member member = memberRepository.findByLoginId(loginRequestDto.getLoginId())
                .orElseThrow(IllegalArgumentException::new);
        if (!loginRequestDto.getPassword().equals(member.getPassword())) { // 비밀번호 불일치 시
            //TODO: 비밀번호 해시 함수를 사용해 암호화 해보기
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        } //TODO: 사용자 정의 예외 공부해보기
        return jwtTokenProvider.createToken(getMemberIdxLoginId(member.getLoginId()));
    }

    public MainSubTownDto updateMainSubLocation(String loginId, MainSubDto mainSubDto) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(IllegalArgumentException::new);

        Location newSubLocation = null;

        Location newMainLocation = locationRepository.findById(mainSubDto.getMain().getLocationIdx()).orElseThrow(IllegalArgumentException::new);
        if (mainSubDto.getSub() != null) {
            newSubLocation = locationRepository.findById(mainSubDto.getSub().getLocationIdx()).orElseThrow(IllegalArgumentException::new);
        }
        member.updateLocations(newMainLocation, newSubLocation);
        return MainSubTownDto.of(member);
    }

    public MemberIdxLoginIdDto getMemberIdxLoginId(String memberLoginId) {
        Member member = memberRepository.findByLoginId(memberLoginId).orElseThrow(IllegalArgumentException::new);
        return MemberIdxLoginIdDto.of(member);
    }

    public MemberInfoDto getMemberInfo(String memberLoginId) {
        Member member = memberRepository.findByLoginId(memberLoginId).orElseThrow(IllegalArgumentException::new);
        return MemberInfoDto.of(member);
    }

    public MainSubTownDto getMainSubLocation(String memberLoginId) { // mainLocation, subLocation 동시에 가져오는 메서드
        log.info("[MemberService.getMainSubLocation]");
        Member member = memberRepository.findByLoginId(memberLoginId).orElseThrow(IllegalArgumentException::new);
        return MainSubTownDto.of(member);
    }

    private Location convertToLocation(LocationDto locationDto) {
        return new Location(locationDto.getLocationIdx(), locationDto.getCity(), locationDto.getDistrict(), locationDto.getTown());
    }
}