package codesquad.secondhand.dto.member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequestDto {

	@NotBlank(message = "공백 없이 아이디를 입력해주세요.")
	@Pattern(regexp = "^[A-Za-z0-9]+$")
	@Size(min = 3, max = 12, message = "영어 소문자, 대문자 3자 이상 10자 이하로 입력해주세요.")
	private String loginId;

	@NotBlank(message = "패스워드를 입력해주세요.")
	@Size(min = 6, max = 12, message = "패스워드는 6자 이상 15자 이하로 입력해주세요.")
	private String password;

	private MultipartFile image;
	private Long mainLocationIdx;
	private Long subLocationIdx;

}
