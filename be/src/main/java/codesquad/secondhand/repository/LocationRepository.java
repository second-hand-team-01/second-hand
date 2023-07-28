package codesquad.secondhand.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
	Optional<Location> findLocationByCityAndDistrictAndTown(String city, String district, String town);
}
