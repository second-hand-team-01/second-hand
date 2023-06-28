package codesquad.secondhand.dto.member;

import org.springframework.web.multipart.MultipartFile;

import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberImageDto {

	private final Long memberIdx;
	private final MultipartFile image;
	private final String imageUrl;

	public static MemberImageDto of(Member member) {
		return new MemberImageDto(member.getMemberIdx(), null, member.getImageUrl());
	}
}
