//package codesquad.secondhand.domain;
//
//import lombok.Getter;
//import lombok.extern.slf4j.Slf4j;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Slf4j
//@Getter
//@Entity
//@Table(name = "category")
//public class Category {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "category_idx")
//    private Long categoryIdx;
//
//    @Column(name = "name", nullable = false)
//    private String name;
//
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Item> items = new ArrayList<>();
//}
