package codesquad.secondhand.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@AllArgsConstructor
public enum StatusCode {

    RESPONSE_SUCCESS(true, 200, 20000, "요청이 완료되었습니다."),
    RESPONSE_FAILURE(false, 400, 40000, "요청이 실패하였습니다."),
    TOKEN_INVALID(false, 401, -40100, "유효하지 않은 토큰입니다."),
    TOKEN_EXPIRED(false, 401, -40101, "만료된 토큰입니다."),
    TOKEN_IS_NULL(false, 401, -40102, "토큰이 없습니다."),
    TOKEN_CAN_NOT_DECODE(false, 401, -40103, "올바르지 않은 토큰 형식입니다."),
    AUTHENTICATION_INVALID_USER(false, 401, -40104, "이용할 수 없는 사용자입니다."),
    REQUIRED_SIGNUP(false, 403, -40301, "추가 회원가입이 필요한 사용자입니다.");

    private final boolean success;
    private final int status;
    private final int code;
    private final String message;

}
