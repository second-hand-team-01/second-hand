package codesquad.secondhand.dto.token;

import codesquad.secondhand.dto.member.MemberIdxLoginIdDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenResponse {

    private final String accessToken;
    private final MemberIdxLoginIdDto memberInfo;

    public static TokenResponse of(String token, MemberIdxLoginIdDto memberIdxLoginIdDto) {
        return new TokenResponse(token, memberIdxLoginIdDto);
    }
}
