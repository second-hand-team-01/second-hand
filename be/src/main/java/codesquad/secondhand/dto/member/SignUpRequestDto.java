package codesquad.secondhand.dto.member;

import codesquad.secondhand.dto.location.LocationDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SignUpRequestDto {

    private final String loginId;
    private final String password;
    private final LocationDto mainLocation;
    private final LocationDto subLocation;

}
