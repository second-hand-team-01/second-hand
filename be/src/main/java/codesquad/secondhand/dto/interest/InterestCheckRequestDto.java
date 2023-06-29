package codesquad.secondhand.dto.interest;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InterestCheckRequestDto {

	private Long itemIdx;
	private Boolean interestChecked;

}
