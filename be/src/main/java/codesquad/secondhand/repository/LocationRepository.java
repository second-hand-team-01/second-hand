package codesquad.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
