package codesquad.secondhand.controller;

import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.exception.code.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static codesquad.secondhand.exception.code.MemberErrorCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/errors")
public class ErrorTestController {

    @GetMapping("/MemberErrorCode/1")
    public ResponseEntity<Object> getMemberError1() {
        throw new RestApiException(AUTHENTICATION_INVALID_USER);
    }

    @GetMapping("/MemberErrorCode/2")
    public ResponseEntity<Object> getMemberError2() {
        throw new RestApiException(REQUIRED_SIGNUP);
    }

    @GetMapping("/CommonErrorCode/1")
    public ResponseEntity<Object> getCommonError1() {
        throw new IllegalArgumentException("getCommonError1 에러입니다 !!!!!!!!");
    }

    @GetMapping("/CommonErrorCode/2")
    public ResponseEntity<Object> getCommonError2() {
        throw new RestApiException(CommonErrorCode.INVALID_PARAMETER);
    }
}
