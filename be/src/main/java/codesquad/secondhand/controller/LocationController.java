package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseListDto;
import codesquad.secondhand.dto.ResponseSetDto;
import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.dto.location.LocationIdDto;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/locations")
public class LocationController {

	private final LocationService locationService;

	@GetMapping
	public ResponseListDto<LocationDto> showLocations() {
		log.info("[LocationController.showLocations]");
		List<LocationDto> locationDtos = locationService.showAllLocations();
		return ResponseListDto.of(RESPONSE_SUCCESS, locationDtos);
	}

	@PostMapping
	public ResponseSetDto<Location> searchLocationId(@RequestBody List<LocationIdDto> locationIdDtoList) {
		Set<Location> set = locationService.findLocationId(locationIdDtoList);
		return ResponseSetDto.of(RESPONSE_SUCCESS, set);
	}

}
