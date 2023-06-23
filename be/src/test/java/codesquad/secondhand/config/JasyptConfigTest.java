package codesquad.secondhand.config;

import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

@Slf4j
class JasyptConfigTest {

    @Test
    void jasypt(){
        String url = System.getProperty("db.url");
        String username = System.getProperty("db.username");
        String password = System.getProperty("db.password");
        String secretKey = System.getProperty("jwt.secret-key");
        String expireLength = System.getProperty("jwt.expire-length");
        String aws_accessKey = System.getProperty("aws.accessKey");
        String aws_secretKey = System.getProperty("aws.secretKey");
        String aws_S3_bucket = System.getProperty("aws.S3_bucket");

        String encryptUrl = jasyptEncrypt(url);
        String encryptUsername = jasyptEncrypt(username);
        String encryptPassword = jasyptEncrypt(password);
        String encryptSecretKey = jasyptEncrypt(secretKey);
        String encryptExpireLength = jasyptEncrypt(expireLength);
        String encryptAws_accessKey = jasyptEncrypt(aws_accessKey);
        String encryptAws_secretKey = jasyptEncrypt(aws_secretKey);
        String encryptAws_S3_bucket = jasyptEncrypt(aws_S3_bucket);

        log.info("Encrypted URL: {}", encryptUrl);
        log.info("Encrypted username: {}", encryptUsername);
        log.info("Encrypted password: {}", encryptPassword);
        log.info("Encrypted secretKey: {}", encryptSecretKey);
        log.info("Encrypted expireLength: {}", encryptExpireLength);
        log.info("Encrypted aws_accessKey: {}", encryptAws_accessKey);
        log.info("Encrypted aws_secretKey: {}", encryptAws_secretKey);
        log.info("Encrypted aws_S3_bucket: {}", encryptAws_S3_bucket);

        assertThat(url).isEqualTo(jasyptDecryt(encryptUrl));
        assertThat(username).isEqualTo(jasyptDecryt(encryptUsername));
        assertThat(password).isEqualTo(jasyptDecryt(encryptPassword));
        assertThat(secretKey).isEqualTo(jasyptDecryt(encryptSecretKey));
        assertThat(expireLength).isEqualTo(jasyptDecryt(encryptExpireLength));
    }

    private String jasyptEncrypt(String input) {
        String key = System.getProperty("password");
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.encrypt(input);
    }

    private String jasyptDecryt(String input){
        String key = System.getProperty("password");
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.decrypt(input);
    }

}
