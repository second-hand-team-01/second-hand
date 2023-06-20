package codesquad.secondhand.dto.member;

import codesquad.secondhand.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginIdMainSubDto {

    private String loginId;
    private Long mainLocationIdx;
    private Long subLocationIdx;

    public static MemberLoginIdMainSubDto of(Member member) {
        return new MemberLoginIdMainSubDto(member.getLoginId(), member.getMainLocation().getLocationIdx(), member.getSubLocation().getLocationIdx());
    }
}
