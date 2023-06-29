import * as S from './ProfileStyle';
import { useRef } from 'react';
import { Icon } from '@components/commons/index';
import { ProfileStyleProps } from './ProfileStyle';

interface ProfileProps extends ProfileStyleProps {
  imgUrl?: string | null;
  setImgUrl?: (newUrl: string, newFile: File) => void;
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

    file && reader.readAsDataURL(file);

    reader.onload = ({ target }) => {
      const targetFile = target?.result as string;
      if (targetFile && file) {
        setImgUrl && setImgUrl(targetFile, file);
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
