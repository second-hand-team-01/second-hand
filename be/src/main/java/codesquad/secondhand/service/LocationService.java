package codesquad.secondhand.service;

import codesquad.secondhand.domain.Location;
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

        // TODO: 로그인 한 사용자의 mainLocationIdx와 subLocationIdx는 제외하고 List로 만들어줘야 함

        log.info("[LocationService.showAllLocations]");
        List<Location> locations = locationRepository.findAll();
        return locations.stream()
                .map(LocationDto::of)
                .collect(Collectors.toList());
    }

}
