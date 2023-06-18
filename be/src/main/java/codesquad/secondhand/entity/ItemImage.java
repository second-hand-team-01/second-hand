package codesquad.secondhand.entity;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

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
}
