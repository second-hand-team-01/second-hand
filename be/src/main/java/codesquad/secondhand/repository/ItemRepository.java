package codesquad.secondhand.repository;

import codesquad.secondhand.entity.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

    Slice<Item> findByLocationLocationIdx(Long locationIdx, Pageable pageable);
}
