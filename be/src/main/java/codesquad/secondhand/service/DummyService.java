package codesquad.secondhand.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import codesquad.secondhand.entity.Member;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DummyService {

	private final ItemService itemService;
	private final MemberRepository memberRepository;
	private final ImageService imageService;

	public void creatDummy() {
		Random random = new Random();
		for (int i = 1; i <= 100; i++) {
			Long randomMemberIdx = (long)random.nextInt(5) + 1;
			int randomImageNumber = random.nextInt(10);
			String randomImageURL =
				"https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg"
					+ randomImageNumber + ".jpg";

			Member member = memberRepository.findById(randomMemberIdx).orElseThrow();
		}

	}
}
