package codesquad.secondhand.dto.member;

import codesquad.secondhand.dto.location.LocationTownDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberIdxLoginIdDto {

    private Long memberIdx;
    private String loginId;

    public static MemberIdxLoginIdDto of(Member member) {
        return new MemberIdxLoginIdDto(member.getMemberIdx(), member.getLoginId());
    }
}
