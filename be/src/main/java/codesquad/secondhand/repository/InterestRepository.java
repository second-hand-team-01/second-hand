package codesquad.secondhand.repository;

import codesquad.secondhand.entity.Interest;
import codesquad.secondhand.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestRepository extends JpaRepository<Interest, Long> {

    int countByItem(Item item);

}
