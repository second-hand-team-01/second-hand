package codesquad.secondhand.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name = "item")
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
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
	@Setter
	private ItemImage itemImage;

	@CreatedDate
	@Column(name = "posted_at")
	private LocalDateTime postedAt;

	@Column(name = "last_modified_at")
	private LocalDateTime lastModifiedAt;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "price", nullable = false)
	private Integer price;

	@Setter
	@Column(name = "view", nullable = false)
	private Integer view;

	@Column(name = "status", nullable = false)
	private String status;

	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ItemImage> itemImages = new ArrayList<>();

	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Interest> interests = new ArrayList<>();

	public Item(Member seller, Category category, Location location, ItemImage itemImage, String name,
		String description,
		Integer price, Integer view, String status) {
		this.seller = seller;
		this.category = category;
		this.location = location;
		this.itemImage = itemImage;
		this.name = name;
		this.description = description;
		this.price = price;
		this.view = view;
		this.status = status;
		this.lastModifiedAt = LocalDateTime.now();
	}

	public void updateItem(Member seller, Category category, Location location, String name, String description,
		Integer price, String status) {
		this.seller = seller;
		if (category != null) {
			this.category = category;
		}
		if (location != null) {
			this.location = location;
		}
		if (name != null) {
			this.name = name;
		}
		if (description != null) {
			this.description = description;
		}
		if (price != null) {
			this.price = price;
		}
		if (status != null) {
			this.status = status;
		}
	}

	public void updateView(Integer view) {
		this.view = view;
	}

	@Override
	public String toString() {
		return "Item{" +
			"itemIdx=" + itemIdx +
			", seller=" + seller +
			", category=" + category +
			", location=" + location +
			", itemImage=" + itemImage +
			", postedAt=" + postedAt +
			", lastModifiedAt=" + lastModifiedAt +
			", name='" + name + '\'' +
			", description='" + description + '\'' +
			", price=" + price +
			", view=" + view +
			", status='" + status + '\'' +
			", itemImages=" + itemImages +
			", interests=" + interests +
			'}';
	}
}
