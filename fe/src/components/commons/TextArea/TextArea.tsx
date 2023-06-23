import icons from '@assets/icons';
import { Icon } from '@commons/index';
import * as S from './TextAreaStyle';
import { useRef, useEffect, ChangeEvent } from 'react';

interface TextAreaProps {
  value: string;
  placeholder: string;
  label?: string;
  icon?: keyof typeof icons;
  hasBackground?: boolean;
  hasBorder?: boolean;
  hasPadding?: boolean;
  shape: 'large' | 'small';
  rows?: number;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  value,
  shape = 'large',
  placeholder,
  label,
  icon,
  hasBackground = false,
  hasBorder = true,
  hasPadding = true,
  maxLength,
  onChange,
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    resizeTextarea();
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

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
      <S.TextArea
        onChange={handleOnChange}
        shape={shape}
        value={value}
        placeholder={placeholder}
        ref={textareaRef}
        maxLength={maxLength}
      ></S.TextArea>
    </S.Wrap>
  );
};
