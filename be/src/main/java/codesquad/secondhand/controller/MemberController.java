//package codesquad.secondhand.controller;
//
//import codesquad.secondhand.dto.ResponseDto;
//import codesquad.secondhand.dto.location.LocationTownDto;
//import codesquad.secondhand.service.MemberService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.TreeMap;
//
//import static codesquad.secondhand.dto.StatusCode.*;
//
//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/{memberLoginId}")
//public class MemberController {
//
//    private final MemberService memberService;
//
//    @GetMapping("/location")
//    public ResponseEntity<ResponseDto<Map<String, LocationTownDto>>> showMemberLocations(@PathVariable String memberLoginId) {
//        log.info("[MemberController.showMemberLocations]");
        // TODO: TreeMap도 DTO로 만들어서 반환해버리자
//        Map<String, LocationTownDto> locationTownDtoMap = new TreeMap<>();
//        locationTownDtoMap.put("main", memberService.getMainLocation(memberLoginId));
//        locationTownDtoMap.put("sub", memberService.getSubLocation(memberLoginId));
//        return ResponseEntity.ok(ResponseDto.of(RESPONSE_SUCCESS, locationTownDtoMap));
//    }
//
//}
