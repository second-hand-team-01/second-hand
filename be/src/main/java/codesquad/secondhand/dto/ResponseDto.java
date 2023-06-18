package codesquad.secondhand.dto;

import lombok.Getter;

@Getter
public class ResponseDto<T> {

    private final boolean success;
    private final int status;
    private final int code;
    private final String message;
    private T data;

    public ResponseDto(StatusCode statusCode, T data) {
        this.success = statusCode.isSuccess();
        this.status = statusCode.getStatus();
        this.code = statusCode.getCode();
        this.message = statusCode.getMessage();
        this.data = data;
    }

    public static <T> ResponseDto<T> of(StatusCode statusCode, T data) {
        return new ResponseDto<>(statusCode, data);
    }
}
