package codesquad.secondhand.dto.member;

import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SignUpResponseDto {

    private final Long memberIdx;

    public static SignUpResponseDto of(Member member) {
        return new SignUpResponseDto(member.getMemberIdx());
    }
}
