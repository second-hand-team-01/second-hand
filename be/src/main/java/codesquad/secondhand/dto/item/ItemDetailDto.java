package codesquad.secondhand.dto.item;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public class ItemDetailDto {

	private final String name;
	private final Integer price;
	private final String description;
	private final Long locationIdx;
	private final Long categoryIdx;
	private final List<MultipartFile> image;
	private final String status;
	@Setter
	private Long sellerIdx;

	@Override
	public String toString() {
		return "ItemDetailDto{" +
			"sellerIdx=" + sellerIdx +
			", name='" + name + '\'' +
			", price=" + price +
			", description='" + description + '\'' +
			", locationIdx=" + locationIdx +
			", categoryIdx=" + categoryIdx +
			", image=" + image +
			'}';
	}
}
