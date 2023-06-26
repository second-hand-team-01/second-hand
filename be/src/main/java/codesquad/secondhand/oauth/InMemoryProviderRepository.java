package codesquad.secondhand.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class InMemoryProviderRepository {

    private final Map<String, OauthProvider> providers;

    public OauthProvider findByProviderName(String name) {
        log.info("[InMemoryProviderRepository]: {}", providers.get("github").getRedirectUrl());
        return providers.get(name);
    }
}
