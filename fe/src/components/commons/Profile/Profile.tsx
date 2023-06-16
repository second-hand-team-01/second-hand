import * as S from './ProfileStyle';
import { Icon } from '@components/commons/index';
import { ProfileStyleProps } from './ProfileStyle';

interface ProfileProps extends ProfileStyleProps {
  onClick: () => void;
}

export const Profile = ({
  url,
  size = 32,
  isEditable = false,
  onClick,
}: ProfileProps) => {
  return (
    <S.Wrap size={size}>
      {isEditable && (
        <S.Editable>
          <Icon
            name="camera"
            color={url ? 'neutralBackground' : 'neutralTextStrong'}
            size={24}
          ></Icon>
        </S.Editable>
      )}
      <S.Profile
        onClick={onClick}
        size={size}
        url={url}
        isEditable={isEditable}
      ></S.Profile>
    </S.Wrap>
  );
};
