package codesquad.secondhand.interceptor;

import codesquad.secondhand.jwt.AuthorizationExtractor;
import codesquad.secondhand.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class BearerAuthInterceptor implements HandlerInterceptor {

    private AuthorizationExtractor authExtractor;
    private JwtTokenProvider jwtTokenProvider;

    public BearerAuthInterceptor(AuthorizationExtractor authExtractor, JwtTokenProvider jwtTokenProvider) {
        this.authExtractor = authExtractor;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {
        log.info("[BearerAuthInterceptor.preHandle 호출]");
        String token = authExtractor.extract(request, "Bearer");
        if (StringUtils.isEmpty(token)) {
            return true;
        }

        if (!jwtTokenProvider.validateToken(token)) {
            throw new IllegalArgumentException("유효하지 않은 토큰");
        }

        String loginId = jwtTokenProvider.getLoginId(token);
        request.setAttribute("loginId", loginId);
        return true;
    }
}
