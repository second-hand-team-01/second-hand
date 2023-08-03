package codesquad.secondhand.dto;

import java.util.Set;

import codesquad.secondhand.exception.code.Code;
import lombok.Getter;

@Getter
public class ResponseSetDto<T> {
	private final boolean success;
	private final int status;
	private final int code;
	private final String message;
	private final Set<T> data;

	public ResponseSetDto(Code code, Set<T> data) {
		this.success = code.isSuccess();
		this.status = code.getStatus();
		this.code = code.getCode();
		this.message = code.getMessage();
		this.data = data;
	}

	public static <T> codesquad.secondhand.dto.ResponseSetDto<T> of(Code code, Set<T> data) {
		return new codesquad.secondhand.dto.ResponseSetDto<>(code, data);
	}
}
