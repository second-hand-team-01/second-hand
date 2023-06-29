package codesquad.secondhand.dto.token;

import codesquad.secondhand.dto.member.MemberIdxLoginIdImageDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenResponse {

	private final String token;
	private final MemberIdxLoginIdImageDto memberInfo;

	public static TokenResponse of(String token, MemberIdxLoginIdImageDto memberIdxLoginIdImageDto) {
		return new TokenResponse(token, memberIdxLoginIdImageDto);
	}
}
