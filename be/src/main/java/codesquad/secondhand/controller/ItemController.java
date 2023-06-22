package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.item.ItemSliceDto;
import codesquad.secondhand.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static codesquad.secondhand.exception.code.CommonResponseCode.RESPONSE_SUCCESS;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<ResponseDto<ItemSliceDto>> showItems(@RequestParam(required = false) Long locationIdx,
                                                               @RequestParam(defaultValue = "0") int page) {
        log.info("[ItemController.showItems()]");
        Pageable pageable = PageRequest.of(page, 10);
        ItemSliceDto itemSliceDto = itemService.showItems(locationIdx, pageable);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, itemSliceDto));
    }

}
