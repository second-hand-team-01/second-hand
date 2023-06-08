import React from 'react';
import * as S from './ButtonStyle';

export interface ButtonProps {
  title: string;
  color: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, color, onClick }) => {
  return (
    <S.StorybookButton onClick={onClick} color={color}>
      {title}
    </S.StorybookButton>
  );
};

export default Button;
