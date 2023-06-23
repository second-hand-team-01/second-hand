import icons from '@assets/icons';
import { Icon } from '@commons/index';
import * as S from './TextInputStyle';

interface TextInputProps {
  value: string;
  placeholder: string;
  label?: string;
  icon?: keyof typeof icons;
  hasBackground?: boolean;
  hasBorder?: boolean;
  hasPadding?: boolean;
  shape: 'large' | 'small';
  type?: string;
  maxLength?: number;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  value,
  shape = 'large',
  placeholder,
  label,
  icon,
  hasBackground = false,
  hasBorder = true,
  hasPadding = true,
  type = 'text',
  maxLength,
  onChange,
  onBlur,
}: TextInputProps) => {
  return (
    <S.Wrap
      hasLabel={!!label}
      hasBackground={hasBackground}
      shape={shape}
      hasBorder={hasBorder}
      hasPadding={hasPadding}
    >
      {label && <S.Label>{label}</S.Label>}
      {icon && <Icon name={icon} color="neutralTextWeak"></Icon>}
      <S.TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        shape={shape}
        type={type}
        maxLength={maxLength}
        onBlur={onBlur}
      ></S.TextInput>
    </S.Wrap>
  );
};
