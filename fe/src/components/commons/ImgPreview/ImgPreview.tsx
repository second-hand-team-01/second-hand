import * as S from './ImgPreviewStyle';
import { useRef, SetStateAction, Dispatch } from 'react';
import { Icon } from '@commons/index';
import { ImgElement } from './ImgElement/ImgElement';
import { Image } from '@type-store/services/images';

interface ImgPreviewProps {
  imageState: [Image[], Dispatch<SetStateAction<Image[]>>];
}

export const ImgPreview = ({ imageState }: ImgPreviewProps) => {
  const [images, setImages] = imageState;
  const FileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOnChange = () => {
    const reader = new FileReader();
    const file = FileInputRef.current?.files?.[0];

    if (file) {
      const isDuplicate = images.some(
        (
          existingImage: any // 수정된 부분
        ) => {
          console.log(existingImage, file.name);
          return (
            existingImage.name === file.name && existingImage.size === file.size
          );
        }
      );

      if (isDuplicate) return alert('이미 업로드한 파일입니다.');
      file && reader.readAsDataURL(file);

      reader.onload = ({ target }) => {
        const targetFile = target?.result as unknown as File;
        const newImage = {
          file: targetFile,
          name: file.name,
          size: file.size,
        };
        if (targetFile) images && setImages([...images, newImage]);
      };
    }
  };

  return (
    <S.ImgPreview>
      <S.ImgContainer>
        <S.FileUploadBtn htmlFor="file_upload">
          <Icon name="camera"></Icon>
          <p>{`${images.length}/10`}</p>
        </S.FileUploadBtn>
        <S.FileInput
          id="file_upload"
          type="file"
          accept=".png, .jpeg"
          onChange={handleFileOnChange}
          ref={FileInputRef}
        ></S.FileInput>
        {images.map((image, i) => (
          <ImgElement
            key={`${image.name}`}
            file={image.file}
            isFirst={i === 0 ? true : false}
            handleDelete={({ currentTarget }) => {
              const btn = currentTarget as HTMLButtonElement;
              const img = btn.previousElementSibling as HTMLImageElement;
              const newFiles = images.filter(
                (file) => `${file.file}` !== img.src
              );
              setImages(newFiles);
            }}
          ></ImgElement>
        ))}
      </S.ImgContainer>
    </S.ImgPreview>
  );
};
