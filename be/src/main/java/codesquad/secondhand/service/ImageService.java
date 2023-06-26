package codesquad.secondhand.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import codesquad.secondhand.exception.EmptyFileException;
import codesquad.secondhand.exception.FileUploadFailedException;
import codesquad.secondhand.exception.code.ImageErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
	private static final String FILE_EXTENSION_DOT = ".";
	private static final int MEMBER_PROFILE_SIZE = 1;

	private final AmazonS3 amazonS3;
	@Value("${aws.s3.bucket}")
	private String bucketName;

	//TODO: 맴버 프로필 이미지 업로드, 삭제
	//TODO: 아이템 이미지 업로드, 삭제
	//TODO: 이미지 URL DB에 저장

	public String upload(MultipartFile multipartFile, String memberId) {
		validateFile(multipartFile);

		ObjectMetadata objectMetadata = new ObjectMetadata();
		String originFileName = multipartFile.getOriginalFilename();

		if (originFileName == null) {
			originFileName = UUID.randomUUID().toString();
		}

		String fileName = memberProfileFileNameConvert(originFileName, memberId, multipartFile);

		objectMetadata.setContentType(multipartFile.getContentType());

		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new FileUploadFailedException(ImageErrorCode.FileUploadFailedException);
		}
		return amazonS3.getUrl(bucketName, fileName).toString();
	}

	// public List<String> upload(List<MultipartFile> multipartFileList, String itemId, String itemCategory) {
	// 	List<String> itemUrlList = new ArrayList<>();
	//
	// 	for (MultipartFile multipartFile : multipartFileList) {
	// 		validateFile(multipartFile);
	//
	// 		ObjectMetadata objectMetadata = new ObjectMetadata();
	// 		String originFileName = multipartFile.getOriginalFilename();
	//
	// 		if (originFileName == null) {
	// 			originFileName = UUID.randomUUID().toString();
	// 		}
	//
	// 		String fileName = itemFileNameConvert(originFileName, memberId, multipartFileList.size());
	//
	// 		objectMetadata.setContentType(multipartFile.getContentType());
	//
	// 		try (InputStream inputStream = multipartFile.getInputStream()) {
	// 			amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
	// 				.withCannedAcl(CannedAccessControlList.PublicRead));
	// 		} catch (IOException e) {
	// 			throw new FileUploadFailedException(ImageErrorCode.FileUploadFailedException);
	// 		}
	// 		itemUrlList.add(amazonS3.getUrl(bucketName, fileName).toString());
	// 	}
	// 	return itemUrlList;
	// }

	private void validateFile(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			throw new EmptyFileException(ImageErrorCode.EmptyFileException);
		}
	}

	private String memberProfileFileNameConvert(String originalFileName, String memberId, MultipartFile multipartFile) {
		StringBuilder sb = new StringBuilder();
		int lastDot = originalFileName.lastIndexOf(FILE_EXTENSION_DOT);
		String fileName = originalFileName.substring(lastDot + 1); // 수정된 부분
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd_HH-mm"); // 수정된 부분
		String initDate = simpleDateFormat.format(date);
		sb.append("member-profile-image")
			.append("/")
			.append(memberId)
			.append("/")
			.append(memberId)
			.append("_")
			.append(initDate)
			.append(".")
			.append(fileName);
		return sb.toString();
	}

	private String itemFileNameConvert(String originalFileName, String memberId, int multipartFileListSize) {
		StringBuilder sb = new StringBuilder();
		String[] originalFileNameSplit = originalFileName.split(FILE_EXTENSION_DOT);
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd HH:mm");
		String initDate = simpleDateFormat.format(date);
		sb.append("member-profile-image")
			.append(memberId)
			.append("_")
			.append(originalFileNameSplit[0])
			.append("_")
			.append(simpleDateFormat.format(date))
			.append(".")
			.append(originalFileNameSplit[1]);
		return sb.toString();
	}
}
