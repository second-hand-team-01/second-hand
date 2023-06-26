package codesquad.secondhand.dto.oauth;

import codesquad.secondhand.dto.member.MemberIdxLoginIdDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OauthLoginResponse {

	private final String token;
	private final MemberIdxLoginIdDto memberInfo;

	public static OauthLoginResponse of(String token, MemberIdxLoginIdDto memberInfo) {
		return new OauthLoginResponse(token, memberInfo);
	}
}
