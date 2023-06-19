package codesquad.secondhand.entity;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

}
