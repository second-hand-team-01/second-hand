package codesquad.secondhand.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

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

	@Override
	public String toString() {
		return "Location{" +
			"locationIdx=" + locationIdx +
			", city='" + city + '\'' +
			", district='" + district + '\'' +
			", town='" + town + '\'' +
			'}';
	}
}
