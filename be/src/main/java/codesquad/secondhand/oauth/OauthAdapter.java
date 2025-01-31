package codesquad.secondhand.oauth;

import java.util.HashMap;
import java.util.Map;

public class OauthAdapter {

	private OauthAdapter() {
	}

	// OauthProperties를 OauthProvider로 변환
	public static Map<String, OauthProvider> getOauthProviders(OauthProperties properties) {
		Map<String, OauthProvider> oauthProvider = new HashMap<>();

		properties.getUser()
			.forEach(
				(key, value) -> oauthProvider.put(key, new OauthProvider(value, properties.getProvider().get(key))));

		return oauthProvider;
	}

}
