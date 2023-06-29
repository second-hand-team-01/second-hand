package codesquad.secondhand.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import codesquad.secondhand.interceptor.BearerAuthInterceptor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	private final BearerAuthInterceptor bearerAuthInterceptor;

	public WebMvcConfig(BearerAuthInterceptor bearerAuthInterceptor) {
		this.bearerAuthInterceptor = bearerAuthInterceptor;
	}

	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(bearerAuthInterceptor)
			.addPathPatterns(
				"/api/info",
				"/api/location",
				"/api/items/*",
				"/api/members/items",
				"/api/members/interest",
				"/api/members/interest/category"
			);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// registry.addMapping("/**")
		//     .allowedOrigins("http://www.guardiansofthecodesquad.site",
		//     "http://guardiansofthecodesquad.site")
		//     .allowedMethods("GET","POST","PUT","DELETE")
		//     .allowCredentials(true)
		//     .maxAge(3000);
		registry.addMapping("/**")
			.allowedMethods("*")
			.allowedOrigins("*")
			.allowedHeaders("*")
			.allowedOriginPatterns("*");
		log.info("[CORS 도메인 등록]");
	}

}
