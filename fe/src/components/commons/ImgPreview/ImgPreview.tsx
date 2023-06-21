import * as S from './ImgPreviewStyle';
import { useState, useRef, SetStateAction, Dispatch } from 'react';
import { Icon } from '@commons/index';

interface ImgPreviewProps {
  fileState: [string[], Dispatch<SetStateAction<string[]>>];
}

export const ImgPreview = ({ fileState }: ImgPreviewProps) => {
  const [files, setFiles] = fileState;
  const FileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOnChange = () => {
    const reader = new FileReader();
    const file = FileInputRef.current?.files?.[0];
    file && reader.readAsDataURL(file);

    reader.onload = ({ target }) => {
      const targetFile = target?.result as string;
      if (targetFile) files && setFiles([...files, targetFile]);
    };
  };
  return (
    <S.ImgPreview>
      <S.ImgContainer>
        <S.FileUploadBtn htmlFor="file_upload">
          <Icon name="camera"></Icon>
          <p>{`${files.length}/10`}</p>
        </S.FileUploadBtn>
        <S.FileInput
          id="file_upload"
          type="file"
          accept=".png, .jpeg"
          onChange={handleFileOnChange}
          ref={FileInputRef}
        ></S.FileInput>
        {files.map((file) => (
          <S.Img src={file} key={file} width="80px" height="80px"></S.Img>
        ))}
      </S.ImgContainer>
    </S.ImgPreview>
  );
};
