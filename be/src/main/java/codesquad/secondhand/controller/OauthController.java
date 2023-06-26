package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.oauth.OauthLoginResponse;
import codesquad.secondhand.service.OauthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/login/oauth/{provider}")
    public ResponseDto<OauthLoginResponse> oauthLogin(@PathVariable String provider, @RequestParam String code) {
        log.info("provider" + provider);
        log.info("code" + code);
        OauthLoginResponse oauthLoginResponse = oauthService.oauthLogin(provider, code);
        return ResponseDto.of(RESPONSE_SUCCESS, oauthLoginResponse);
    }
}
