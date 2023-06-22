package codesquad.secondhand.service;

import codesquad.secondhand.repository.ItemImageRepository;
import com.amazonaws.services.s3.AmazonS3;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {
    private final AmazonS3 amazonS3;
    private final ItemImageRepository itemImageRepository;
    @Value("${aws.s3.bucket}")
    private String bucketName;
    private static final int MAX_FILE_SIZE = 1048576;
    private static final int MAX_FILE_NUMBER = 10;
    private static final String FILE_EXTENSION_DOT = "\\.";

    public List<String> upload(List<MultipartFile> multipartFileList, String memberId) {
        List<String> urlList = new ArrayList<>();

        if(multipartFileList.size() > MAX_FILE_NUMBER) {
            // TODO MaxFileNumberException 변경
            throw new IllegalArgumentException();
        }

        for(MultipartFile multipartFile : multipartFileList) {
            validateFile(multipartFile);

            String originFileName = "";
            if(multipartFile.getOriginalFilename() == null) {
                originFileName = UUID.randomUUID().toString();
            }
            String fileName = fileNameConvert(originFileName, memberId);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());

            try (InputStream inputStream = multipartFile.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                // todo FileUploadFailedException 변경
                throw new IllegalArgumentException();
            }
            urlList.add(amazonS3.getUrl(bucketName, fileName).toString());
        }
        return urlList;
    }

    private void validateFile(MultipartFile multipartFile) {
        if(multipartFile.isEmpty()) {
            //TODO EmptyFileException 변경
            throw new IllegalArgumentException();
        }
        if(MAX_FILE_SIZE < multipartFile.getSize()) {
            //TODO MaxFileSizeException 변경
            throw new IllegalArgumentException();
        }
    }

    private String fileNameConvert(String originalFileName, String memberId) {
        StringBuilder sb = new StringBuilder();
        String[] originalFileNameSplit = originalFileName.split(FILE_EXTENSION_DOT);
        sb.append(memberId)
                .append("_")
                .append(originalFileNameSplit[0])
                .append("_")
                .append(System.currentTimeMillis())
                .append(".")
                .append(originalFileNameSplit[1]);
        return sb.toString();
    }
}
