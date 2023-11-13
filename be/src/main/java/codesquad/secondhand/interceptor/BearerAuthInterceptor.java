package codesquad.secondhand.interceptor;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import codesquad.secondhand.exception.RestApiException;
import codesquad.secondhand.exception.code.TokenErrorCode;
import codesquad.secondhand.jwt.AuthorizationExtractor;
import codesquad.secondhand.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;

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
		Object handler) throws IOException {
		log.info("[BearerAuthInterceptor.preHandle 호출]");

		String token = authExtractor.extract(request, "Bearer");
		log.info("토큰 : " + token);

		String requestURI = request.getRequestURI();
		if (requestURI.startsWith("/api/dummy")) {
			if(token.isEmpty()) {
				response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access is allowed for powerUser only");
				return false;
			}
			String loginId = jwtTokenProvider.getLoginId(token);
			if (!"powerUser".equals(loginId)) {
				response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access is allowed for powerUser only");
				return false;
			}
		}

		if (StringUtils.isEmpty(token)) {
			return true;
		}

		if (!jwtTokenProvider.validateToken(token)) {
			throw new RestApiException(TokenErrorCode.TOKEN_INVALID);
		}


		Long memberIdx = jwtTokenProvider.getMemberIdx(token);
		request.setAttribute("memberIdx", memberIdx);
		return true;
	}
}
