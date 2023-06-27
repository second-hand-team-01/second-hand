package codesquad.secondhand.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

	Slice<Item> findByLocationLocationIdx(Long locationIdx, Pageable pageable);

	Slice<Item> findBySellerIdx(Long sellerIdx, Pageable pageable);
}
