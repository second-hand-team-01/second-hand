package codesquad.secondhand.dto.location;

import codesquad.secondhand.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MainSubTownDto {

    private final LocationTownDto main;
    private final LocationTownDto sub;

    public static MainSubTownDto of(Member member) {
        LocationTownDto main = LocationTownDto.of(member.getMainLocation());
        LocationTownDto sub = LocationTownDto.of(member.getSubLocation());
        return new MainSubTownDto(main, sub);
    }
}
