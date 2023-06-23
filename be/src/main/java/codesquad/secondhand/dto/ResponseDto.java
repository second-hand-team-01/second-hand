package codesquad.secondhand.dto;

import codesquad.secondhand.exception.code.Code;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
public class ResponseDto<T> {

    private final boolean success;
    private final int status;
    private final int code;
    private final String message;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private T data;

    public ResponseDto(Code code, T data) {
        this.success = code.isSuccess();
        this.status = code.getStatus();
        this.code = code.getCode();
        this.message = code.getMessage();
        this.data = data;
    }

    public static <T> ResponseDto<T> of(Code code, T data) {
        return new ResponseDto<>(code, data);
    }
}