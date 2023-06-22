package codesquad.secondhand.service;

import codesquad.secondhand.repository.ItemImageRepository;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemImageService {
    private AmazonS3Client amazonS3Client;
    private ItemImageRepository itemImageRepository;
    @Value("${aws.s3.bucket}")
    private String bucketName;

    public String upload(MultipartFile multipartFile) {
        validateFile(multipartFile);
        String fileName = UUID.randomUUID().toString();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            // todo FileUploadFailedException 변경
             throw new IllegalArgumentException();
        }

        return amazonS3Client.getUrl(bucketName, fileName).toString();
    }

    public void validateFile(MultipartFile multipartFile) {
        if(multipartFile.isEmpty()) {
            //TODO EmptyFileException 변경
            throw new IllegalArgumentException();
        }
    }

}
