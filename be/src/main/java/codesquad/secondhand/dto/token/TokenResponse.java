package codesquad.secondhand.dto.token;

import codesquad.secondhand.dto.location.LocationTownDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.dto.member.MemberLoginIdMainSubDto;
import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenResponse {

    private final String accessToken;
    private final MemberLoginIdMainSubDto memberInfo;

    public static TokenResponse of(String token, MemberLoginIdMainSubDto memberLoginIdMainSubDto) {
        return new TokenResponse(token, memberLoginIdMainSubDto);
    }
}
