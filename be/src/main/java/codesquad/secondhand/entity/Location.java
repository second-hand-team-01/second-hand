package codesquad.secondhand.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "location")
@NoArgsConstructor
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

    public Location(Long locationIdx, String city, String district, String town) {
        this.locationIdx = locationIdx;
        this.city = city;
        this.district = district;
        this.town = town;
    }
}
