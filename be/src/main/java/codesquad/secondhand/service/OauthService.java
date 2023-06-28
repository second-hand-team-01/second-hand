package codesquad.secondhand.service;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import codesquad.secondhand.dto.member.MemberIdxLoginIdDto;
import codesquad.secondhand.dto.oauth.MemberProfile;
import codesquad.secondhand.dto.oauth.OauthLoginResponse;
import codesquad.secondhand.dto.oauth.OauthTokenResponse;
import codesquad.secondhand.entity.Member;
import codesquad.secondhand.jwt.JwtTokenProvider;
import codesquad.secondhand.oauth.InMemoryProviderRepository;
import codesquad.secondhand.oauth.OauthAttributes;
import codesquad.secondhand.oauth.OauthProvider;
import codesquad.secondhand.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OauthService {

	private final InMemoryProviderRepository inMemoryProviderRepository;
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;

	public OauthLoginResponse oauthLogin(String providerName, String code) {

		OauthProvider provider = inMemoryProviderRepository.findByProviderName(providerName);
		log.info("provider: {}", provider);
		OauthTokenResponse oauthTokenResponse = getToken(code, provider);

		MemberProfile memberProfile = getUserProfile(providerName, oauthTokenResponse, provider);

		Member member = saveOrFindMember(memberProfile);

		String accessToken = jwtTokenProvider.createToken(MemberIdxLoginIdDto.of(member));

		return OauthLoginResponse.of(accessToken, MemberIdxLoginIdDto.of(member));
	}

	private Member saveOrFindMember(MemberProfile memberProfile) {
		// 1. oauthId로 해당 oauthId로 로그인을 했던 적이 있는지 확인
		return memberRepository.findByOauthId(memberProfile.getOauthId())
			.orElseGet(() -> {
				String randomId = createRandomLoginId();
				return memberRepository.save(memberProfile.toMember(randomId));
			});
	}

	private String createRandomLoginId() {
		long randomNum = ThreadLocalRandom.current().nextLong(1, (long)Math.pow(36, 9));
		String randomId = "gu#" + Long.toString(randomNum, 36);
		return randomId;
	}

	private MemberProfile getUserProfile(String providerName, OauthTokenResponse tokenResponse,
		OauthProvider provider) {
		Map<String, Object> userAttributes = getUserAttributes(provider, tokenResponse);

		return OauthAttributes.extract(providerName, userAttributes);
	}

	private Map<String, Object> getUserAttributes(OauthProvider provider, OauthTokenResponse tokenResponse) {
		return WebClient.create()
			.get()
			.uri(provider.getUserInfoUrl())
			.headers(header -> header.setBearerAuth(tokenResponse.getAccessToken()))
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
			})
			.block();
	}

	private OauthTokenResponse getToken(String code, OauthProvider provider) {
		return WebClient.create()
			.post()
			.uri(provider.getTokenUrl())
			.headers(header -> {
				header.setBasicAuth(provider.getClientId(), provider.getClientSecret());
				header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
				header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
				header.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
			})
			.bodyValue(tokenRequest(code, provider))
			.retrieve()
			.bodyToMono(OauthTokenResponse.class)
			.block();
	}

	private MultiValueMap<String, String> tokenRequest(String code, OauthProvider provider) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("code", code);
		formData.add("grant_type", "authorization_code");
		formData.add("redirect_uri", provider.getRedirectUrl());
		return formData;
	}
}
