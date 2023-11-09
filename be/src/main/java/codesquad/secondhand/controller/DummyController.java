package codesquad.secondhand.controller;

import static codesquad.secondhand.exception.code.CommonResponseCode.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.service.DummyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dummy")
public class DummyController {

	private final DummyService dummyService;

	@GetMapping
	public ResponseDto<?> creatDummy() {
		log.info("더미호출");
		dummyService.creatDummy();
		return ResponseDto.of(RESPONSE_SUCCESS, null);
	}
}
