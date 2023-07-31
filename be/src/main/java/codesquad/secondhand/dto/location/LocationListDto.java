package codesquad.secondhand.dto.location;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LocationListDto {

	private List<String> locationString;

	@Override
	public String toString() {
		return "LocationListDto{" +
			"locationString=" + locationString +
			'}';
	}
}
