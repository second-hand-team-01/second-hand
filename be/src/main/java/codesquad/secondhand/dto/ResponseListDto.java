package codesquad.secondhand.dto;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Getter
public class ResponseListDto<T> {

    private final boolean success;
    private final int status;
    private final int code;
    private final String message;
    private final List<T> data;

    public ResponseListDto(StatusCode statusCode, List<T> data) {
        this.success = statusCode.isSuccess();
        this.status = statusCode.getStatus();
        this.code = statusCode.getCode();
        this.message = statusCode.getMessage();
        this.data = data;
    }

    public static <T> ResponseListDto<T> of(StatusCode statusCode, List<T> data) {
        return new ResponseListDto<>(statusCode, data);
    }
}
