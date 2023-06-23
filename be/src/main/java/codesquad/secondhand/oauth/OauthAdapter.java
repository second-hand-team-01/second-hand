package codesquad.secondhand.oauth;

import java.util.HashMap;
import java.util.Map;

public class OauthAdapter {
    // 단일 인증 제공자를 사용 할 경우 필요 없는 클래스이나, 추후 확장성을 고려하여 미리 생성
    private OauthAdapter() {}

    public static Map<String, OauthProvider> getOauthProviders(OauthProperties properties) {
        Map<String, OauthProvider> oauthProvider = new HashMap<>();

        properties.getUser().forEach((key, value) -> oauthProvider.put(key,
                new OauthProvider(value, properties.getProvider().get(key))));
        return oauthProvider;
    }
}
