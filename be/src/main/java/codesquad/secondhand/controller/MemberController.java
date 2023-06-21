package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.location.LocationTownDto;
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

import static codesquad.secondhand.dto.StatusCode.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

//    @PostMapping("/join")
//    public ResponseEntity<ResponseDto<>>

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<TokenResponse>> login(@RequestBody LoginRequestDto loginRequestDto) {
        log.info("[MemberController.login]");
        String token = memberService.createToken(loginRequestDto);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, TokenResponse.of(token, memberService.getMemberLoginIdMainSub(loginRequestDto.getLoginId()))));
    }

    @GetMapping("/info")
    public ResponseEntity<ResponseDto<MemberInfoDto>> showMemberInfo(HttpServletRequest request) {
        String loginId = (String) request.getAttribute("loginId");
        MemberInfoDto memberInfo = memberService.getMemberInfo(loginId);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, memberInfo));
    }

    @GetMapping("{memberLoginId}/location")
    public ResponseEntity<ResponseDto<MainSubTownDto>> showMemberLocations(@PathVariable String memberLoginId, HttpServletRequest request) {
        log.info("[MemberController.showMemberLocations]");
        MainSubTownDto mainSubTownDto = memberService.getMainSubLocation(memberLoginId);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto));
    }

}
