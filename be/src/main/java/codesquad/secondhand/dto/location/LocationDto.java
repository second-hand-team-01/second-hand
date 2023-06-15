//package codesquad.secondhand.dto.location;
//
//import codesquad.secondhand.domain.Location;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//
//@Getter
//@RequiredArgsConstructor
//public class LocationDto {
//
//    private final Long locationIdx;
//    private final String locationName;
//
//    public static LocationDto of(Location location) {
//        return new LocationDto(location.getLocationIdx(),
//                buildLocationName(location));
//    }
//
//    private static String buildLocationName(Location location) {
//        StringBuilder stringBuilder = new StringBuilder();
//        stringBuilder.append(location.getCity())
//                .append(" ")
//                .append(location.getDistrict())
//                .append(" ")
//                .append(location.getTown());
//        return stringBuilder.toString();
//    }
//}
