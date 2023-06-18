package codesquad.secondhand.dto.category;

import codesquad.secondhand.entity.Category;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CategoryDto {

    private final Long idx;
    private final String name;
    private final String imgUrl;

    public static CategoryDto of(Category category) {
        return new CategoryDto(category.getCategoryIdx(),
                category.getName(),
                category.getImageUrl());
    }

}
