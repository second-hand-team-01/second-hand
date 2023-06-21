package codesquad.secondhand.dto.location;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
public class MainSubDto {

    private LocationDto main;
    private LocationDto sub;

}
