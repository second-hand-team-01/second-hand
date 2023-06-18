package codesquad.secondhand.dto.location;

import codesquad.secondhand.entity.Location;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LocationTownDto {

    private final Long locationIdx;
    private final String locationName;

    public static LocationTownDto of(Location location) {
        if (location == null) {
            return new LocationTownDto(null, null);
        }
        return new LocationTownDto(location.getLocationIdx(),
                location.getTown());
    }

}
