package codesquad.secondhand.dto.location;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.TreeMap;

@Getter
@RequiredArgsConstructor
public class LocationTownMapDto {

    private final Map<String, LocationTownDto> locationTownDtoTreeMap;

    public static LocationTownMapDto of(LocationTownDto mainLocationTownDto, LocationTownDto subLocationTownDto) {
        Map<String, LocationTownDto> locationTownDtoMap = new TreeMap<>();
        locationTownDtoMap.put("main", mainLocationTownDto);
        locationTownDtoMap.put("sub", subLocationTownDto);
        return new LocationTownMapDto(locationTownDtoMap);
    }
}
