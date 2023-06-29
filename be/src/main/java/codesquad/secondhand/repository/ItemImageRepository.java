package codesquad.secondhand.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.ItemImage;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {
	List<ItemImage> findAllByItemItemIdx(Long itemIdx);
}
