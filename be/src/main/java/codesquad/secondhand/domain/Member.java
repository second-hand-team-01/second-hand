//package codesquad.secondhand.domain;
//
//import lombok.Getter;
//import lombok.extern.slf4j.Slf4j;
//
//import javax.persistence.*;
//
//@Getter
//@Entity
//@Table(name = "member")
//public class Member {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "member_idx")
//    private Long memberIdx;
//
//    @Column(name = "login_id", nullable = false)
//    private String loginId;
//
//    @Column(name = "image_url")
//    private String imageUrl;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "main_location_idx")
//    private Location mainLocation;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "sub_location_idx")
//    private Location subLocation;
//}
