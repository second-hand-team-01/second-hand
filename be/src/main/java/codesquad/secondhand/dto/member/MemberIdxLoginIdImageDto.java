package codesquad.secondhand.dto.member;

import codesquad.secondhand.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberIdxLoginIdImageDto {

	private Long memberIdx;
	private String loginId;
	private String imgUrl;

	public static MemberIdxLoginIdImageDto of(Member member) {
		return new MemberIdxLoginIdImageDto(member.getMemberIdx(), member.getLoginId(), member.getImageUrl());
	}
}
