//package codesquad.secondhand.service;
//
//import codesquad.secondhand.domain.Member;
//import codesquad.secondhand.dto.location.LocationTownDto;
//import codesquad.secondhand.dto.location.MainSubTownDto;
//import codesquad.secondhand.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Slf4j
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class MemberService {
//
//    private final MemberRepository memberRepository;
//
//    public LocationTownDto getMainLocation(String memberLoginId) { // mainLocation 가져오는 메서드
//        log.info("[MemberService.getMainLocation]");
//        Member member = memberRepository.findByLoginId(memberLoginId);
//        return LocationTownDto.of(member.getMainLocation());
//    }
//
//    public LocationTownDto getSubLocation(String memberLoginId) { // subLocation 가져오는 메서드
//        log.info("[MemberService.getSubLocation]");
//        Member member = memberRepository.findByLoginId(memberLoginId);
//        return LocationTownDto.of(member.getSubLocation());
//    }
//
//    public MainSubTownDto getMainSubLocation(String memberLoginId) { // mainLocation, subLocation 동시에 가져오는 메서드
//        log.info("[MemberService.getMainSubLocation]");
//        Member member = memberRepository.findByLoginId(memberLoginId);
//        return MainSubTownDto.of(LocationTownDto.of(member.getMainLocation()), LocationTownDto.of(member.getSubLocation()));
//    }
//}
