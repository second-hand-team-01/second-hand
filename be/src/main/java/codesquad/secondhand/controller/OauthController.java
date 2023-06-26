package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.oauth.OauthLoginResponse;
import codesquad.secondhand.service.OauthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static codesquad.secondhand.exception.code.CommonResponseCode.RESPONSE_SUCCESS;

@RestController
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/login/oauth/{provider}")
    public ResponseDto<OauthLoginResponse> oauthLogin(@PathVariable String provider, @RequestParam String code) {
        OauthLoginResponse oauthLoginResponse = oauthService.oauthLogin(provider, code);
        return ResponseDto.of(RESPONSE_SUCCESS, oauthLoginResponse);
    }
}
