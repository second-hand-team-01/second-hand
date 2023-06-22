package codesquad.secondhand.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberIdxTokenDto {

    private Long memberIdx;
    private String token;

    public static MemberIdxTokenDto of(Long memberIdx, String token) {
        return new MemberIdxTokenDto(memberIdx, token);
    }
}
