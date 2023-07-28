package codesquad.secondhand.config;

import java.util.List;
import java.util.Locale;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.github.javafaker.Faker;

import codesquad.secondhand.entity.Location;
import codesquad.secondhand.repository.CategoryRepository;
import codesquad.secondhand.repository.ChatRoomRepository;
import codesquad.secondhand.repository.InterestRepository;
import codesquad.secondhand.repository.ItemImageRepository;
import codesquad.secondhand.repository.ItemRepository;
import codesquad.secondhand.repository.LocationRepository;
import codesquad.secondhand.repository.MemberRepository;
import codesquad.secondhand.service.ImageService;

@SpringBootTest
public class TestDummyData {

	private final ItemRepository itemRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final InterestRepository interestRepository;
	private final CategoryRepository categoryRepository;
	private final MemberRepository memberRepository;
	private final LocationRepository locationRepository;
	private final ItemImageRepository itemImageRepository;
	private final ImageService imageService;

	@Autowired
	public TestDummyData(ItemRepository itemRepository, ChatRoomRepository chatRoomRepository,
		InterestRepository interestRepository, CategoryRepository categoryRepository, MemberRepository memberRepository,
		LocationRepository locationRepository, ItemImageRepository itemImageRepository, ImageService imageService) {
		this.itemRepository = itemRepository;
		this.chatRoomRepository = chatRoomRepository;
		this.interestRepository = interestRepository;
		this.categoryRepository = categoryRepository;
		this.memberRepository = memberRepository;
		this.locationRepository = locationRepository;
		this.itemImageRepository = itemImageRepository;
		this.imageService = imageService;
	}

	@Test
	public void createDummyData() {
		Faker faker = new Faker(new Locale("ko"));

		// 지역 정보 리스트
		List<Location> locations = locationRepository.findAll();
		System.out.println(locations);

		// for (Location location : locations) {
		// 	// 사용자 생성
		// 	Member user = new User();
		// 	user.setName(faker.name().fullName()); // 랜덤한 이름
		// 	user.setLocation(location); // 지역 설정
		// 	// ... 사용자의 다른 필드 설정
		//
		// 	// 상품 생성
		// 	Item item = new Item();
		// 	item.setName(faker.commerce().productName()); // 랜덤한 상품 이름
		// 	item.setLocation(location); // 지역 설정
		// 	// ... 상품의 다른 필드 설정
		//
		// 	// 저장소에 저장
		// 	userRepository.save(user);
		// 	itemRepository.save(item);
		// }
	}
}
