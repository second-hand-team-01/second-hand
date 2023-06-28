package codesquad.secondhand.dto.category;

import codesquad.secondhand.entity.Category;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CategoryWithoutImageDto {

	private final Long idx;
	private final String name;

	public static CategoryWithoutImageDto of(Category category) {
		return new CategoryWithoutImageDto(category.getCategoryIdx(),
			category.getName());
	}
}
