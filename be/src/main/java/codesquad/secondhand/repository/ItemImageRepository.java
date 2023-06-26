package codesquad.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.ItemImage;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {

}
