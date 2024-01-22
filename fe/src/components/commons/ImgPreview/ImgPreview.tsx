import * as S from './ImgPreviewStyle';
import { useRef, SetStateAction, Dispatch, useState } from 'react';
import { Icon, Dialog } from '@commons/index';
import { ImgElement } from './ImgElement/ImgElement';
import { Image } from '@type-store/services/items';
import { ERROR_MESSAGE } from '@constants/error';

interface ImgPreviewProps {
  imageState: [Image[], Dispatch<SetStateAction<Image[]>>];
}

export const ImgPreview = ({ imageState }: ImgPreviewProps) => {
  const [images, setImages] = imageState;
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const FileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOnChange = () => {
    const reader = new FileReader();
    const file = FileInputRef.current?.files?.[0];

    if (file) {
      const isDuplicate = images.some((existingImage: Image) => {
        if (!existingImage.name || !existingImage.size) return false;
        return (
          existingImage.name === file.name && existingImage.size === file.size
        );
      });

      if (isDuplicate) {
        setErrorDialogOpen(true);
      } else {
        reader.onload = ({ target }) => {
          const targetFile = target?.result as string;

          const newImage = {
            file: file,
            name: file.name,
            size: file.size,
            fileString: targetFile,
          };

          if (targetFile) setImages((prevImages) => [...prevImages, newImage]);
        };

        reader.readAsDataURL(file);
      }

      FileInputRef.current.value = '';
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
            key={image.name}
            file={image.fileString}
            isFirst={i === 0 ? true : false}
            handleDelete={({ currentTarget }) => {
              const btn = currentTarget as HTMLButtonElement;
              const img = btn.previousElementSibling as HTMLImageElement;
              const newFiles = images.filter(
                (file) => `${file.fileString}` !== img.src
              );
              setImages(newFiles);
            }}
          />
        ))}
      </S.ImgContainer>
      <Dialog
        isOpen={isErrorDialogOpen}
        btnInfos={{
          right: {
            text: '확인',
            onClick: () => {
              setErrorDialogOpen(false);
            },
          },
        }}
        handleBackDropClick={() => setErrorDialogOpen(false)}
      >
        {ERROR_MESSAGE.DUPLICATED_FILE}
      </Dialog>
    </S.ImgPreview>
  );
};
