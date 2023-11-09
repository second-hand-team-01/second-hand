package codesquad.secondhand.dto.location;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MainSubDto {

	private Long main;
	private Long sub;

	@Override
	public String toString() {
		return "MainSubDto{" +
			"main=" + main +
			", sub=" + sub +
			'}';
	}
}
