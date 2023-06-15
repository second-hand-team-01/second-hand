import { icons } from '@assets/icons';
import { Icon } from '@commons/index';
import * as S from './TextInputStyle';

interface TextInputProps {
  shape?: 'large' | 'small';
  value: string;
  placeholder: string;
  label?: string;
  icon?: keyof typeof icons;
  hasBackground?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  value,
  shape = 'large',
  placeholder,
  label,
  icon,
  hasBackground = false,
  onChange,
}: TextInputProps) => {
  return (
    <S.Wrap hasLabel={!!label} hasBackground={hasBackground} shape={shape}>
      {label && <S.Label>{label}</S.Label>}
      {icon && <Icon name={icon} color="neutralTextWeak"></Icon>}
      <S.TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        shape={shape}
      ></S.TextInput>
    </S.Wrap>
  );
};
