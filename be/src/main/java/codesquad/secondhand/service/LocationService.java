package codesquad.secondhand.service;

import codesquad.secondhand.entity.Location;
import codesquad.secondhand.dto.location.LocationDto;
import codesquad.secondhand.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

}
