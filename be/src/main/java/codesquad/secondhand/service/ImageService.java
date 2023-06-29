package codesquad.secondhand.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import codesquad.secondhand.dto.item.ItemDetailDto;
import codesquad.secondhand.exception.FileUploadFailedException;
import codesquad.secondhand.exception.code.ImageErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
	private static final String FILE_EXTENSION_DOT = ".";
	private final AmazonS3 amazonS3;
	@Value("${aws.s3.bucket}")
	private String bucketName;

	//TODO: 아이템 이미지 업로드, 삭제
	//TODO: 이미지 URL DB에 저장

	public String upload(MultipartFile multipartFile, String memberId) {

		String originFileName;
		ObjectMetadata objectMetadata = new ObjectMetadata();

		if (multipartFile.getOriginalFilename() == null) {
			originFileName = UUID.randomUUID().toString();
		} else {
			originFileName = multipartFile.getOriginalFilename();
		}

		String fileName = memberProfileFileNameConvert(originFileName, memberId);

		objectMetadata.setContentType(multipartFile.getContentType());

		try (InputStream inputStream = multipartFile.getInputStream()) {
			amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new FileUploadFailedException(ImageErrorCode.FileUploadFailedException);
		}
		return fileName + "@" + amazonS3.getUrl(bucketName, fileName).toString();
	}

	public String uploadFromUrl(String imageUrl, String loginId) {
		try {
			URL url = new URL(imageUrl);
			URLConnection urlConnection = url.openConnection();
			String contentType = urlConnection.getContentType();

			InputStream inputStream = urlConnection.getInputStream();

			String originFileName = UUID.randomUUID().toString();
			String fileExtension = contentType.split("/")[1];
			String fileName = memberProfileFileNameConvert(originFileName, loginId, fileExtension);
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(contentType);

			amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
			return fileName + "@" + amazonS3.getUrl(bucketName, fileName).toString();
		} catch (IOException e) {
			throw new FileUploadFailedException(ImageErrorCode.FileUploadFailedException);
		}
	}

	public void delete(String filePath) {
		DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, filePath);
		amazonS3.deleteObject(deleteObjectRequest);
	}

	public List<String> upload(Long imageIdx, ItemDetailDto itemDetailDto) {
		List<String> itemUrlList = new ArrayList<>();
		List<MultipartFile> multipartFileList = itemDetailDto.getImage();

		int cnt = 1;
		for (MultipartFile multipartFile : multipartFileList) {

			ObjectMetadata objectMetadata = new ObjectMetadata();
			String originFileName = multipartFile.getOriginalFilename();

			if (originFileName == null) {
				originFileName = UUID.randomUUID().toString();
			}

			String fileName = itemFileNameConvert(originFileName, imageIdx, cnt);

			objectMetadata.setContentType(multipartFile.getContentType());
			objectMetadata.setContentLength(multipartFile.getSize());

			try (InputStream inputStream = multipartFile.getInputStream()) {
				amazonS3.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
			} catch (IOException e) {
				throw new FileUploadFailedException(ImageErrorCode.FileUploadFailedException);
			}
			itemUrlList.add(amazonS3.getUrl(bucketName, fileName).toString());
			cnt++;
		}
		return itemUrlList;
	}

	private String memberProfileFileNameConvert(String originalFileName, String memberId, String fileExtension) {
		StringBuilder sb = new StringBuilder();
		int lastDot = originalFileName.lastIndexOf(FILE_EXTENSION_DOT);
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd_HH-mm");
		String initDate = simpleDateFormat.format(date);
		sb.append("member-profile-image")
			.append("/")
			.append(memberId)
			.append("/")
			.append(memberId)
			.append("_")
			.append(initDate)
			.append(".")
			.append(fileExtension);
		return sb.toString();
	}

	private String memberProfileFileNameConvert(String originalFileName, String memberId) {
		StringBuilder sb = new StringBuilder();
		int lastDot = originalFileName.lastIndexOf(FILE_EXTENSION_DOT);
		String fileName = originalFileName.substring(lastDot + 1);
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd_HH-mm");
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

	private String itemFileNameConvert(String originalFileName, Long itemIdx, int cnt) {
		StringBuilder sb = new StringBuilder();
		int lastDot = originalFileName.lastIndexOf(FILE_EXTENSION_DOT);
		String fileName = originalFileName.substring(lastDot + 1);
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd_HH-mm");
		String initDate = simpleDateFormat.format(date);
		sb.append("item-image")
			.append("/")
			.append(itemIdx)
			.append("/")
			.append(itemIdx)
			.append("_")
			.append(cnt)
			.append("_")
			.append(initDate)
			.append(".")
			.append(fileName);
		return sb.toString();
	}
}
