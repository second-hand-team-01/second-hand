package codesquad.secondhand.service;

import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.dto.location.MainSubDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.dto.member.*;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.jwt.JwtTokenProvider;
import codesquad.secondhand.repository.LocationRepository;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static codesquad.secondhand.exception.code.MemberErrorCode.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ImageService imageService;

    public void signUp(SignUpRequestDto signUpRequestDto) {
        memberRepository.findByLoginId(signUpRequestDto.getLoginId()) // ID 중복 검사
                .ifPresent(member -> { // 중복 시 SAME_ID_ALREADY_EXISTS 예외
                    throw new RestApiException(SAME_ID_ALREADY_EXISTS);
                });

        List<String> urlList = imageService.upload(signUpRequestDto.getImage(), signUpRequestDto.getLoginId());

        Location main = locationRepository.findById(signUpRequestDto.getMainLocationIdx()).orElseThrow();
        Location sub = locationRepository.findById(signUpRequestDto.getSubLocationIdx()).orElseThrow();
        SaveMemberDto saveMemberDto = SaveMemberDto.of(signUpRequestDto, urlList.get(0), main, sub);
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

        Location newMainLocation = locationRepository.findById(mainSubDto.getMain().getLocationIdx()).orElseThrow(IllegalArgumentException::new);
        if (mainSubDto.getSub() != null) {
            newSubLocation = locationRepository.findById(mainSubDto.getSub().getLocationIdx()).orElseThrow(IllegalArgumentException::new);
        }
        member.updateLocations(newMainLocation, newSubLocation);
        return MainSubTownDto.of(member);
    }

    public MemberIdxLoginIdDto getMemberIdxLoginId(Long memberIdx) {
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
        return MemberIdxLoginIdDto.of(member);
    }

    public MemberInfoDto getMemberInfo(Long memberIdx) {
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
        return MemberInfoDto.of(member);
    }

    public MainSubTownDto getMainSubLocation(Long memberIdx) { // mainLocation, subLocation 동시에 가져오는 메서드
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new RestApiException(NO_EXISTING_MEMBER));
        return MainSubTownDto.of(member);
    }

}
