package codesquad.secondhand.dto;

import codesquad.secondhand.exception.code.Code;
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

    public ResponseListDto(Code code, List<T> data) {
        this.success = code.isSuccess();
        this.status = code.getStatus();
        this.code = code.getCode();
        this.message = code.getMessage();
        this.data = data;
    }

    public static <T> ResponseListDto<T> of(Code code, List<T> data) {
        return new ResponseListDto<>(code, data);
    }
}
