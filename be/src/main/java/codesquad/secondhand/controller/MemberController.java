package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.location.MainSubDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.dto.member.LoginRequestDto;
import codesquad.secondhand.dto.member.MemberInfoDto;
import codesquad.secondhand.dto.token.TokenResponse;
import codesquad.secondhand.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static codesquad.secondhand.exception.code.CommonResponseCode.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

//    @PostMapping("/signup")
//    public ResponseEntity<ResponseDto<SignUpResponseDto>> signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
//
//    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<TokenResponse>> login(@RequestBody LoginRequestDto loginRequestDto) {
        String token = memberService.createToken(loginRequestDto);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, TokenResponse.of(token, memberService.getMemberIdxLoginId(loginRequestDto.getLoginId()))));
    }

    @GetMapping("/info")
    public ResponseEntity<ResponseDto<MemberInfoDto>> showMemberInfo(HttpServletRequest request) {
        String loginId = (String) request.getAttribute("loginId");
        MemberInfoDto memberInfo = memberService.getMemberInfo(loginId);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, memberInfo));
    }

    @GetMapping("/location")
    public ResponseEntity<ResponseDto<MainSubTownDto>> showMemberLocations(HttpServletRequest request) {
        String loginId = (String) request.getAttribute("loginId");
        MainSubTownDto mainSubTownDto = memberService.getMainSubLocation(loginId);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto));
    }

    @PutMapping("/location")
    public ResponseEntity<ResponseDto<MainSubTownDto>> updateMemberLocations(@RequestBody MainSubDto mainSubDto, HttpServletRequest request) {
        String loginId = (String) request.getAttribute("loginId");
        MainSubTownDto mainSubTownDto = memberService.updateMainSubLocation(loginId, mainSubDto);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto));
    }
}
