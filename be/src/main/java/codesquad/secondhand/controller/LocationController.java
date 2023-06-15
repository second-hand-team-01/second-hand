package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.StatusCode;
import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static codesquad.secondhand.dto.StatusCode.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    @GetMapping
    public ResponseEntity<ResponseDto<List<LocationDto>>> showLocations() {
        log.info("[LocationController.showLocations]");
        List<LocationDto> locationDtos = locationService.showAllLocations();
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, locationDtos));
    }

}
