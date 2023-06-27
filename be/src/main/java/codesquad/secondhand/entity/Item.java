package codesquad.secondhand.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
@Table(name = "item")
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_idx")
	private Long itemIdx;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "seller_idx")
	private Member seller;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_idx")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_idx")
	private Location location;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "main_image_idx")
	private ItemImage itemImage;

	@CreatedDate
	@Column(name = "posted_at", nullable = false)
	private LocalDateTime postedAt;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "price", nullable = false)
	private Integer price;

	@Column(name = "view", nullable = false)
	private Integer view;

	@Column(name = "status", nullable = false)
	private String status;

	// Item과 ItemImage는 OneToMany 관계
	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ItemImage> itemImages = new ArrayList<>();

	// Item과 Interest는 OneToMany 관계
	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Interest> interests = new ArrayList<>();

	@Builder
	public Item(Long itemIdx, Member seller, Category category, Location location, ItemImage itemImage,
		LocalDateTime postedAt, String name, String description, Integer price, Integer view, String status,
		List<ItemImage> itemImages, List<Interest> interests) {
		this.itemIdx = itemIdx;
		this.seller = seller;
		this.category = category;
		this.location = location;
		this.itemImage = itemImage;
		this.postedAt = postedAt;
		this.name = name;
		this.description = description;
		this.price = price;
		this.view = view;
		this.status = status;
		this.itemImages = itemImages;
		this.interests = interests;
	}

	public Item() {

	}
}
