package codesquad.secondhand.repository;

import codesquad.secondhand.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByLocationLocationIdx(Long locationIdx);
}
