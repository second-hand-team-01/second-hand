package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.StatusCode;
import codesquad.secondhand.dto.item.ItemDto;
import codesquad.secondhand.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static codesquad.secondhand.dto.StatusCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<ResponseDto<List<ItemDto>>> showItems(@RequestParam(required = false) Long locationIdx) {
        log.info("[ItemController.showItems()]");
        List<ItemDto> itemDtos = itemService.showItems(locationIdx);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, itemDtos));
    }

}
