package codesquad.secondhand.dto.oauth;

import codesquad.secondhand.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberProfile {

    private final String oauthId;
    private final String email;
    private final String name;
    private final String imageUrl;

    @Builder
    public MemberProfile(String oauthId, String email, String name, String imageUrl) {
        this.oauthId = oauthId;
        this.email = email;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public Member toMember(String randomId) {
        return Member.builder()
                .loginId(randomId)
                .imageUrl(imageUrl)
                .oauthId(oauthId)
                .build();
    }

}
