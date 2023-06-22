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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {
    private final AmazonS3 amazonS3;
    @Value("${aws.s3.bucket}")
    private String bucketName;
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

            ObjectMetadata objectMetadata = new ObjectMetadata();
            String originFileName = multipartFile.getOriginalFilename();

            if(originFileName == null) {
                originFileName = UUID.randomUUID().toString();
            }

            String fileName = fileNameConvert(originFileName, memberId);
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
    }

    private String fileNameConvert(String originalFileName, String memberId) {
        StringBuilder sb = new StringBuilder();
        String[] originalFileNameSplit = originalFileName.split(FILE_EXTENSION_DOT);
        Date date = new Date(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd HH:mm");
        sb.append(memberId)
                .append("_")
                .append(originalFileNameSplit[0])
                .append("_")
                .append(simpleDateFormat.format(date))
                .append(".")
                .append(originalFileNameSplit[1]);
        return sb.toString();
    }
}
