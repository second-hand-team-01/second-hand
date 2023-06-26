package codesquad.secondhand.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import codesquad.secondhand.dto.member.SaveMemberDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_idx")
	private Long memberIdx;

	@Column(name = "login_id", nullable = false)
	private String loginId;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "image_url")
	private String imageUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "main_location_idx")
	private Location mainLocation;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sub_location_idx")
	private Location subLocation;

	@Column(name = "oauth_id")
	private String oauthId;

	public Member(String loginId, String password, String imageUrl, Location mainLocation, Location subLocation) {
		this.loginId = loginId;
		this.password = password;
		this.imageUrl = imageUrl;
		this.mainLocation = mainLocation;
		this.subLocation = subLocation;
	}

	@Builder
	public Member(String loginId, String imageUrl, String oauthId) {
		this.loginId = loginId;
		this.imageUrl = imageUrl;
		this.oauthId = oauthId;
	}

	public static Member of(SaveMemberDto saveMemberDto) {
		return new Member(
			saveMemberDto.getLoginId(),
			saveMemberDto.getPassword(),
			saveMemberDto.getImageUrl(),
			saveMemberDto.getMainLocation(),
			saveMemberDto.getSubLocation()
		);
	}

	public void updateLocations(Location newMainLocation, Location newSubLocation) {
		this.mainLocation = newMainLocation;
		this.subLocation = newSubLocation;
	}
}
