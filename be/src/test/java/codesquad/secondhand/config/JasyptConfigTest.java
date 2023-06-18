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

        String encryptUrl = jasyptEncrypt(url);
        String encryptUsername = jasyptEncrypt(username);
        String encryptPassword = jasyptEncrypt(password);

        log.info("Encrypted URL: {}", encryptUrl);
        log.info("Encrypted username: {}", encryptUsername);
        log.info("Encrypted password: {}", encryptPassword);

        assertThat(url).isEqualTo(jasyptDecryt(encryptUrl));
        assertThat(username).isEqualTo(jasyptDecryt(encryptUsername));
        assertThat(password).isEqualTo(jasyptDecryt(encryptPassword));
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