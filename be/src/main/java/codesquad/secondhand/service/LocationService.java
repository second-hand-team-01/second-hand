package codesquad.secondhand.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.dto.location.LocationIdDto;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LocationService {

	private final LocationRepository locationRepository;

	public List<LocationDto> showAllLocations() {
		log.info("[LocationService.showAllLocations]");
		List<Location> locations = locationRepository.findAll();
		return locations.stream()
			.map(LocationDto::of)
			.collect(Collectors.toList());
	}

	public Set<Location> findLocationId(List<LocationIdDto> locationIdDtoList) {
		Set<Location> set = new HashSet<>();

		for (LocationIdDto l : locationIdDtoList) {
			String[] locationString = l.getLocationString().split(" ");
			String townQuery = locationString[2];
			for (int i = 0; i < townQuery.length(); i++) {
				if (Character.isDigit(townQuery.charAt(i))) {
					townQuery = townQuery.substring(0, i) + "%";
					break;
				}
			}
			log.info(townQuery);
			Location location = locationRepository.findLocationByCityAndDistrictAndTownLike(locationString[0],
				locationString[1], townQuery).orElseThrow();
			set.add(location);
		}
		return set;
	}
}
