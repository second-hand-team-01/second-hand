package codesquad.secondhand.domain;

import javax.persistence.*;

@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_idx")
    private Long locationIdx;

    @Column(name = "city")
    private String city;

    @Column(name = "district")
    private String district;

    @Column(name = "town")
    private String town;
}
