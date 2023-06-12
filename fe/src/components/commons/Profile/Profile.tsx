import * as S from './ProfileStyle';
import { Icon } from '@components/commons/index';

export interface ProfileStyleProps {
  url?: string;
  size: number;
  isEditable: boolean;
}

export interface WrapStyleProps {
  size: number;
}

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
        <div className="camera-icon">
          <Icon
            name="camera"
            color={url ? 'neutralBackground' : 'textStrong'}
            size={24}
          ></Icon>
        </div>
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
