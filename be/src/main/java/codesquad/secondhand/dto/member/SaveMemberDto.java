package codesquad.secondhand.dto.member;

import codesquad.secondhand.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SaveMemberDto {

	private String loginId;
	private String password;
	private String imagePath;
	private String imageUrl;
	private Location mainLocation;
	private Location subLocation;

	public static SaveMemberDto of(SignUpRequestDto signUpRequestDto, String imagePath, String imageUrl, Location main,
		Location sub) {
		return new SaveMemberDto(
			signUpRequestDto.getLoginId(),
			signUpRequestDto.getPassword(),
			imagePath,
			imageUrl,
			main,
			sub
		);
	}
}
