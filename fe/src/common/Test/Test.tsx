// Button.tsx
import React from 'react';
import * as S from './TestStyle';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <S.StorybookButton></S.StorybookButton>;
};

export default Button;
