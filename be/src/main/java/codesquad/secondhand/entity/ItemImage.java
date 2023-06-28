package codesquad.secondhand.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Entity
@Table(name = "item_image")
public class ItemImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_image_idx")
	private Long itemImageIdx;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_idx")
	private Item item;

	@Column(name = "image_url")
	private String imageUrl;

	public ItemImage(Item item, String imageUrl) {
		this.item = item;
		this.imageUrl = imageUrl;
	}

	public ItemImage() {

	}
}
