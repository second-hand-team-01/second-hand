package codesquad.secondhand.entity;

import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.dto.member.SaveMemberDto;
import codesquad.secondhand.dto.member.SignUpRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "member")
@NoArgsConstructor
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

    public Member(String loginId, String password, String imageUrl, Location mainLocation, Location subLocation) {
        this.loginId = loginId;
        this.password = password;
        this.imageUrl = imageUrl;
        this.mainLocation = mainLocation;
        this.subLocation = subLocation;
    }

    public void updateLocations(Location newMainLocation, Location newSubLocation) {
        this.mainLocation = newMainLocation;
        this.subLocation = newSubLocation;
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
}