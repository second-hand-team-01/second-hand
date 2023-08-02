package codesquad.secondhand.dto.location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LocationIdDto {

	private String locationString;

	@Override
	public String toString() {
		return "LocationListDto{" +
			"locationString=" + locationString +
			'}';
	}
}
