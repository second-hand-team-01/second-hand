package codesquad.secondhand.oauth;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class InMemoryProviderRepository {

    private final Map<String, OauthProvider> providers;

    public OauthProvider findByProviderName(String name) {
        return providers.get(name);
    }
}
