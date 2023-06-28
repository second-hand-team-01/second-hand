package codesquad.secondhand.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codesquad.secondhand.dto.category.CategoryDto;
import codesquad.secondhand.dto.category.CategoryWithoutImageDto;
import codesquad.secondhand.entity.Category;
import codesquad.secondhand.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public List<CategoryDto> showAllCategories() {
		log.info("[CategoryService.showAllCategories]");
		List<Category> categories = categoryRepository.findAll();
		return categories.stream()
			.map(CategoryDto::of)
			.collect(Collectors.toList());
	}

	public List<CategoryWithoutImageDto> showAllCategoriesWithoutImage() {
		log.info("[CategoryService.showAllCategoriesWithoutImage]");
		List<Category> categories = categoryRepository.findAll();
		return categories.stream()
			.map(CategoryWithoutImageDto::of)
			.collect(Collectors.toList());
	}

}
