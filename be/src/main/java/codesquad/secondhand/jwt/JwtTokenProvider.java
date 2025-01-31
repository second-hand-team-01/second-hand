package codesquad.secondhand.jwt;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import codesquad.secondhand.dto.member.MemberIdxLoginIdDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {

	private String secretKey;
	private long validityInMilliseconds;

	public JwtTokenProvider(@Value("${security.jwt.token.secret-key") String secretKey,
		@Value("${security.jwt.token.expire-length}") long validityInMilliseconds) {
		this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
		this.validityInMilliseconds = validityInMilliseconds;
	}

	public String createToken(MemberIdxLoginIdDto subject) {

		Date now = new Date();
		Date validity = new Date(now.getTime()
			+ validityInMilliseconds);

		return Jwts.builder()
			.claim("memberIdx", subject.getMemberIdx())
			.claim("loginId", subject.getLoginId())
			.setIssuedAt(now)
			.setExpiration(validity)
			.signWith(SignatureAlgorithm.HS256, secretKey)
			.compact();
	}

	public Long getMemberIdx(String token) {
		Integer memberIdx = (Integer)Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody()
			.get("memberIdx");
		return memberIdx.longValue();
	}

	public String getLoginId(String token) {
		return (String)Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody()
			.get("loginId");
	}

	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			log.info("[JwtTokenProvider]");
			log.info("[claims = {}]", claims);
			if (claims.getBody().getExpiration().before(new Date())) {
				return false;
			}
			return true;
		} catch (JwtException exception) {
			return false;
		} catch (IllegalArgumentException exception) {
			return false;
		}
	}
}
