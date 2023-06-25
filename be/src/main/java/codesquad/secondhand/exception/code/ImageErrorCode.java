package codesquad.secondhand.exception.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ImageErrorCode implements Code {
	FileUploadFailedException(false, 500, -50000, "서버 오류로 파일 업로드에 실패했습니다."),
	EmptyFileException(false, 400, -40000, "빈 파일은 업로드 할 수 없습니다.");

	private final boolean success;
	private final int status;
	private final int code;
	private final String message;
}
