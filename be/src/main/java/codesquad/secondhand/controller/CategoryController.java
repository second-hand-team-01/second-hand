package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseListDto;
import codesquad.secondhand.dto.category.CategoryDto;
import codesquad.secondhand.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static codesquad.secondhand.exception.code.CommonResponseCode.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ResponseListDto<CategoryDto>> showCategories() {
        log.info("[CategoryController.showCategories]");
        List<CategoryDto> categoryDtos = categoryService.showAllCategories();
        return ResponseEntity.ok(ResponseListDto.of(RESPONSE_SUCCESS, categoryDtos));
    }

}
