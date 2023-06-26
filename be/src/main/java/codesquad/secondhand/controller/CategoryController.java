package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseListDto;
import codesquad.secondhand.dto.category.CategoryDto;
import codesquad.secondhand.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping
	public ResponseListDto<CategoryDto> showCategories() {
		log.info("[CategoryController.showCategories]");
		List<CategoryDto> categoryDtos = categoryService.showAllCategories();
		return ResponseListDto.of(RESPONSE_SUCCESS, categoryDtos);
	}

}
