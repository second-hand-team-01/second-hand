package codesquad.secondhand.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import org.apache.commons.io.IOUtils;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.javafaker.Faker;

import codesquad.secondhand.dto.item.ItemDetailDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DummyService {

	private final ItemService itemService;

	public void creatDummy() {
		Random random = new Random();
		for (int i = 1; i <= 10; i++) {
			Long randomMemberIdx = (long) random.nextInt(5) + 1;
			int randomImageNumber = random.nextInt(10);
			String randomImageURL = "https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/"
				+ randomImageNumber + ".jpg";

			Faker faker = new Faker(new Locale("ko"));

			List<MultipartFile> list = new ArrayList<>();
			list.add(downloadImageAsMultipartFile(randomImageURL, "tempImageName"));

			ItemDetailDto itemDetailDto = new ItemDetailDto(
				faker.commerce().productName(),
				faker.number().randomDigitNotZero() * 1000,
				faker.lorem().sentence(),
				(long)faker.number().numberBetween(1, 6),
				(long)faker.number().numberBetween(1, 18),
				list,
				"판매중",
				randomMemberIdx);

			itemService.creatItem(itemDetailDto);
		}
	}

	private MultipartFile downloadImageAsMultipartFile(String imageUrl, String imageName) {
		try {
			URL url = new URL(imageUrl);
			InputStream in = url.openStream();
			byte[] imageBytes = IOUtils.toByteArray(in);
			in.close();

			return new MockMultipartFile("image", imageName, "image/jpeg", imageBytes);
		} catch (IOException e) {
			throw new RuntimeException("Failed to download image from URL", e);
		}
	}
}
