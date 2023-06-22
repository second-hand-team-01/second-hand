package codesquad.secondhand.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CommonResponseCode implements Code{

    RESPONSE_SUCCESS(true,200,20000, "요청이 완료되었습니다.");

    private final boolean success;
    private final int status;
    private final int code;
    private final String message;
}
