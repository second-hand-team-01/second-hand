package codesquad.secondhand.config;

import static org.assertj.core.api.Assertions.*;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;

import lombok.extern.slf4j.Slf4j;

@Slf4j
class JasyptConfigTest {

	@Test
	void jasypt() {
		String url = System.getProperty("db.url");
		String username = System.getProperty("db.username");
		String password = System.getProperty("db.password");
		String secretKey = System.getProperty("jwt.secret-key");
		String expireLength = System.getProperty("jwt.expire-length");
		String aws_accessKey = System.getProperty("aws.accessKey");
		String aws_secretKey = System.getProperty("aws.secretKey");
		String aws_S3_bucket = System.getProperty("aws.S3_bucket");
		String oauth_client_secret = System.getProperty("oauth.client_secret");
		String oauth_client_secret_ios = System.getProperty("oauth.client_secret_ios");

		String encryptUrl = jasyptEncrypt(url);
		String encryptUsername = jasyptEncrypt(username);
		String encryptPassword = jasyptEncrypt(password);
		String encryptSecretKey = jasyptEncrypt(secretKey);
		String encryptExpireLength = jasyptEncrypt(expireLength);
		String encryptAws_accessKey = jasyptEncrypt(aws_accessKey);
		String encryptAws_secretKey = jasyptEncrypt(aws_secretKey);
		String encryptAws_S3_bucket = jasyptEncrypt(aws_S3_bucket);
		String encryptOauth_client_secret = jasyptEncrypt(oauth_client_secret);
		String encryptOauth_client_secret_ios = jasyptEncrypt(oauth_client_secret_ios);

		log.info("Encrypted URL: {}", encryptUrl);
		log.info("Encrypted username: {}", encryptUsername);
		log.info("Encrypted password: {}", encryptPassword);
		log.info("Encrypted secretKey: {}", encryptSecretKey);
		log.info("Encrypted expireLength: {}", encryptExpireLength);
		log.info("Encrypted aws_accessKey: {}", encryptAws_accessKey);
		log.info("Encrypted aws_secretKey: {}", encryptAws_secretKey);
		log.info("Encrypted aws_S3_bucket: {}", encryptAws_S3_bucket);
		log.info("Encrypted oauth_client_secret: {}", encryptOauth_client_secret);
		log.info("Encrypted oauth_client_secret_ios: {}", encryptOauth_client_secret_ios);

		assertThat(url).isEqualTo(jasyptDecryt(encryptUrl));
		assertThat(username).isEqualTo(jasyptDecryt(encryptUsername));
		assertThat(password).isEqualTo(jasyptDecryt(encryptPassword));
		assertThat(secretKey).isEqualTo(jasyptDecryt(encryptSecretKey));
		assertThat(expireLength).isEqualTo(jasyptDecryt(encryptExpireLength));
		assertThat(oauth_client_secret).isEqualTo(jasyptDecryt(encryptOauth_client_secret));
		assertThat(oauth_client_secret_ios).isEqualTo(jasyptDecryt(encryptOauth_client_secret_ios));
	}

	private String jasyptEncrypt(String input) {
		String key = System.getProperty("password");
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setAlgorithm("PBEWithMD5AndDES");
		encryptor.setPassword(key);
		return encryptor.encrypt(input);
	}

	private String jasyptDecryt(String input) {
		String key = System.getProperty("password");
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setAlgorithm("PBEWithMD5AndDES");
		encryptor.setPassword(key);
		return encryptor.decrypt(input);
	}

}
