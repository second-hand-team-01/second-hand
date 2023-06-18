package codesquad.secondhand.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_idx")
    private Long locationIdx;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "town", nullable = false)
    private String town;

}
