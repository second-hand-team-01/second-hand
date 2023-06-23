package codesquad.secondhand.exception;

import codesquad.secondhand.exception.code.Code;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RestApiException extends RuntimeException {

    private final Code errorCode;

    @Override
    public String getMessage() {
        return errorCode.getMessage();
    }
}
