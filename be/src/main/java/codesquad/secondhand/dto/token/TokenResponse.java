package codesquad.secondhand.dto.token;

import codesquad.secondhand.dto.location.LocationTownDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenResponse {

    private final String accessToken;
    private final Long mainLocationIdx;
    private final Long subLocationIdx;

    public static TokenResponse of(String token, Long mainLocationIdx, Long subLocationIdx) {
        return new TokenResponse(token, mainLocationIdx, subLocationIdx);
    }
}
