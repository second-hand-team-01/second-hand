package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.location.MainSubDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.dto.member.*;
import codesquad.secondhand.dto.token.TokenResponse;
import codesquad.secondhand.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static codesquad.secondhand.exception.code.CommonResponseCode.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseDto<?> signUp(@ModelAttribute SignUpRequestDto signUpRequestDto) {
        memberService.signUp(signUpRequestDto);
        return ResponseDto.of(RESPONSE_SUCCESS,null);
    }

    @PostMapping("/login")
    public ResponseDto<TokenResponse> login(@RequestBody LoginRequestDto loginRequestDto) {
        MemberIdxTokenDto memberIdxTokenDto = memberService.login(loginRequestDto);
        MemberIdxLoginIdDto memberIdxLoginId = memberService.getMemberIdxLoginId(memberIdxTokenDto.getMemberIdx());
        return ResponseDto.of(RESPONSE_SUCCESS, TokenResponse.of(memberIdxTokenDto.getToken(), memberIdxLoginId));
    }

    @GetMapping("/info")
    public ResponseDto<MemberInfoDto> showMemberInfo(HttpServletRequest request) {
        Long memberIdx = (Long) request.getAttribute("memberIdx");
        MemberInfoDto memberInfo = memberService.getMemberInfo(memberIdx);
        return ResponseDto.of(RESPONSE_SUCCESS, memberInfo);
    }

    @GetMapping("/location")
    public ResponseDto<MainSubTownDto> showMemberLocations(HttpServletRequest request) {
        Long memberIdx = (Long) request.getAttribute("memberIdx");
        MainSubTownDto mainSubTownDto = memberService.getMainSubLocation(memberIdx);
        return ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto);
    }

    @PutMapping("/location")
    public ResponseDto<MainSubTownDto> updateMemberLocations(@RequestBody MainSubDto mainSubDto, HttpServletRequest request) {
        Long memberIdx = (Long) request.getAttribute("memberIdx");
        MainSubTownDto mainSubTownDto = memberService.updateMainSubLocation(memberIdx, mainSubDto);
        return ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto);
    }
}