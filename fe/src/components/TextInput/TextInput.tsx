import { ReactElement } from 'react';
import * as S from './TextInputStyle';

export interface WrapStyleProps {
  height: number;
  hasLabel: boolean;
}

interface TextInputProps {
  height: number;
  value: string;
  placeholder: string;
  label: string;
  onChange: () => void;
}

export const TextInput = ({
  height = 44,
  value,
  placeholder,
  label,
  onChange,
}: TextInputProps) => {
  return (
    <S.Wrap height={height} hasLabel={!!label}>
      {label && <S.Label>{label}</S.Label>}
      <S.TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></S.TextInput>
    </S.Wrap>
  );
};
