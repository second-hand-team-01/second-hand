package codesquad.secondhand.dto.item;

import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SellerDto {
	private final Long sellerIdx;
	private final String sellerId;
	private final String sellerProfileImage;

	public static SellerDto to(Member member) {
		return new SellerDto(member.getMemberIdx(),
			member.getLoginId(),
			member.getImageUrl());
	}
}
