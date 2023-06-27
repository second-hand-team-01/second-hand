package codesquad.secondhand.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import codesquad.secondhand.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

	Slice<Item> findByLocationLocationIdx(Long locationIdx, Pageable pageable);

	@Query("SELECT i FROM Item i WHERE i.seller.memberIdx = :sellerIdx AND ("
		+ "(i.status = '판매중' OR i.status = '예약중') AND :status = 'sell' "
		+ "OR (i.status = '판매완료') AND :status = 'sold')")
	Slice<Item> findBySellerIdxAndStatus(@Param("sellerIdx") Long sellerIdx, @Param("status") String status, @Param("pageable") Pageable pageable);

}
