package codesquad.secondhand.repository;

import codesquad.secondhand.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
