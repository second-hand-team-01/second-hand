package codesquad.secondhand.exception.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ItemErrorCode implements Code {

	NO_EXISTING_ITEM(false, 404, -40401, "없는 상품입니다.");

	private final boolean success;
	private final int status;
	private final int code;
	private final String message;
}

