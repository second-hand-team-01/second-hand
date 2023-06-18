package codesquad.secondhand.controller;

import codesquad.secondhand.dto.ResponseDto;
import codesquad.secondhand.dto.location.MainSubTownDto;
import codesquad.secondhand.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static codesquad.secondhand.dto.StatusCode.RESPONSE_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/{memberLoginId}")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/location")
    public ResponseEntity<ResponseDto<MainSubTownDto>> showMemberLocations(@PathVariable String memberLoginId) {
        log.info("[MemberController.showMemberLocations]");
        MainSubTownDto mainSubTownDto = memberService.getMainSubLocation(memberLoginId);
        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, mainSubTownDto));
    }

}
