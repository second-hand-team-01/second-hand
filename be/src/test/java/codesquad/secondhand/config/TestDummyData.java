package codesquad.secondhand.config;

import static codesquad.secondhand.service.ImageService.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import com.github.javafaker.Faker;

import codesquad.secondhand.entity.Category;
import codesquad.secondhand.entity.Item;
import codesquad.secondhand.entity.ItemImage;
import codesquad.secondhand.entity.Location;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.repository.CategoryRepository;
import codesquad.secondhand.repository.ItemImageRepository;
import codesquad.secondhand.repository.ItemRepository;
import codesquad.secondhand.repository.LocationRepository;
import codesquad.secondhand.repository.MemberRepository;
import codesquad.secondhand.service.ImageService;

@SpringBootTest
public class TestDummyData {

	private final ItemRepository itemRepository;
	private final CategoryRepository categoryRepository;
	private final MemberRepository memberRepository;
	private final LocationRepository locationRepository;
	private final ItemImageRepository itemImageRepository;
	private final ImageService imageService;

	@Autowired
	public TestDummyData(ItemRepository itemRepository,
		CategoryRepository categoryRepository, MemberRepository memberRepository, LocationRepository locationRepository,
		ItemImageRepository itemImageRepository, ImageService imageService) {
		this.itemRepository = itemRepository;
		this.categoryRepository = categoryRepository;
		this.memberRepository = memberRepository;
		this.locationRepository = locationRepository;
		this.itemImageRepository = itemImageRepository;
		this.imageService = imageService;
	}

	@Test
	public void createDummyData() throws IOException {
		Faker faker = new Faker(new Locale("ko"));

		List<Location> locations = locationRepository.findAll();
		List<Category> categories = categoryRepository.findAll();
		List<MultipartFile> multipartFileList = new ArrayList<>();
		MultipartFile multipartFileProfile = createMultipartFileFromPath("D:/A/BG/" + 0 + ".png");

		for (int i = 1; i <= 4; i++) {
			String filePath = "D:/A/BG/" + i + ".png";
			MultipartFile file = createMultipartFileFromPath(filePath);
			multipartFileList.add(file);
		}

		for (int i = 0; i < locations.size(); i++) {
			String memberId = UUID.randomUUID().toString().substring(0, 10);
			String password = faker.internet().password();
			String[] profileUrl = imageService.upload(multipartFileProfile, memberId).split("@");
			String imagePath = profileUrl[1];
			String imageUrl = profileUrl[0];
			Location mainLocation = locations.get(i);
			Location subLocation = locations.get((i + 1) % locations.size());

			Member member = new Member(memberId, password, imagePath, imageUrl, mainLocation, subLocation);
			member.updateLocations(mainLocation, subLocation);

			memberRepository.save(member);

			for (int j = 0; j < 6; j++) {
				Category randomCategory = categories.get(faker.random().nextInt(categories.size()));
				String name = faker.commerce().productName();
				String description = faker.lorem().sentence();
				Integer price = faker.number().randomDigitNotZero() * 1000;
				Integer view = faker.number().numberBetween(0, 100);
				String status = "판매중";

				Item item = new Item(member, randomCategory, member.getMainLocation(), null, name, description, price,
					view, status);
				itemRepository.save(item);

				List<String> url = imageService.upload(item.getItemIdx(), multipartFileList);
				for (int k = 0; k < url.size(); k++) {
					String[] temp = url.get(k).split("@");
					if (k == 0) {
						ItemImage itemImage = itemImageRepository.save(new ItemImage(item, temp[1], temp[0]));
						item.setItemImage(itemImage);
						itemRepository.save(item);
						continue;
					}
					itemImageRepository.save(new ItemImage(item, temp[1], temp[0]));
				}
			}
		}
	}
}
