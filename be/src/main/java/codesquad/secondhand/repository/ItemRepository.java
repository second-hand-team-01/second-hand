package codesquad.secondhand.repository;

import codesquad.secondhand.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
