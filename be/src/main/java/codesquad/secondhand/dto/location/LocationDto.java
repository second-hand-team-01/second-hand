package codesquad.secondhand.dto.location;

import codesquad.secondhand.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {

    private Long locationIdx;
    private String locationName;
    private String city;
    private String district;
    private String town;

    public static LocationDto of(Location location) {
        return new LocationDto(location.getLocationIdx(),
                buildLocationName(location),
                location.getCity(),
                location.getDistrict(),
                location.getTown());
    }

    private static String buildLocationName(Location location) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(location.getCity())
                .append(" ")
                .append(location.getDistrict())
                .append(" ")
                .append(location.getTown());
        return stringBuilder.toString();
    }
}
