package codesquad.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.Interest;
import codesquad.secondhand.entity.Item;

public interface InterestRepository extends JpaRepository<Interest, Long> {

	int countByItem(Item item);

}
