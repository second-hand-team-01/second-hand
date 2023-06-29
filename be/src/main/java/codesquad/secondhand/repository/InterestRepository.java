package codesquad.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import codesquad.secondhand.entity.Interest;
import codesquad.secondhand.entity.Item;

public interface InterestRepository extends JpaRepository<Interest, Long> {

	int countByItem(Item item);

	boolean existsByItemAndMember_MemberIdx(Item item, Long memberIdx);

	@Modifying
	@Query("DELETE FROM Interest i WHERE i.member.memberIdx = :memberIdx AND i.item.itemIdx = :itemIdx")
	void deleteByMemberIdAndItemId(@Param("memberIdx") Long memberIdx, @Param("itemIdx") Long itemIdx);
}
