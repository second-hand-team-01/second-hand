package codesquad.secondhand.dto.oauth;

import codesquad.secondhand.dto.member.MemberIdxLoginIdImageDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OauthLoginResponse {

	private final String token;
	private final MemberIdxLoginIdImageDto memberInfo;

	public static OauthLoginResponse of(String token, MemberIdxLoginIdImageDto memberInfo) {
		return new OauthLoginResponse(token, memberInfo);
	}
}
