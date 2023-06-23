package codesquad.secondhand.dto.member;

import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberInfoDto {

    private final Long memberIdx;
    private final String memberLoginId;
    private final String imageUrl;

    public static MemberInfoDto of(Member member) {
        return new MemberInfoDto(member.getMemberIdx(), member.getLoginId(), member.getImageUrl());
    }
}
