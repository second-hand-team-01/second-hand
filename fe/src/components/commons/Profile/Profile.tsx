import * as S from './ProfileStyle';
import { Dispatch, useRef } from 'react';
import { Icon } from '@components/commons/index';
import { ProfileStyleProps } from './ProfileStyle';

// Preview인지 여부를 prop으로 받아서 fetch를 할지 말지 결정

interface ProfileProps extends ProfileStyleProps {
  imgUrl?: string | null;
  setImgUrl?: Dispatch<string>;
}

export const Profile = ({
  size = 32,
  isEditable = false,
  imgUrl,
  setImgUrl,
}: ProfileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileClickHandler = () => {
    fileInputRef.current?.click();
  };

  const fileOnChangeHandler = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = files?.[0];

    file && reader.readAsDataURL(file); // file의 result에 base64 인코딩된 URL이 담김(비동기 작업)

    reader.onload = ({ target }) => {
      // 비동기로 변경된 URL을 받아오는 로직
      const targetFile = target?.result as string;

      if (targetFile) {
        setImgUrl && setImgUrl(targetFile);
      }
    };
  };

  return (
    <S.Wrap size={size} onClick={fileClickHandler}>
      {isEditable && (
        <S.Editable>
          <Icon
            name="camera"
            color={imgUrl ? 'neutralBackground' : 'neutralTextStrong'}
            size={24}
          />
          <S.FileInput
            id="file-upload"
            type="file"
            accept=".png, .jpeg"
            onChange={fileOnChangeHandler}
            ref={fileInputRef}
          />
        </S.Editable>
      )}
      <S.Profile size={size} url={imgUrl} isEditable={isEditable} />
    </S.Wrap>
  );
};
