import { ReactNode } from 'react';
import { Button } from '../Button/Button';
import * as S from './ErrorStyle';

interface ErrorProps {
  children: ReactNode;
  button?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Error = ({ children, button, onClick }: ErrorProps) => {
  return (
    <S.Error>
      <S.Contents>
        {children}
        {button && (
          <Button
            title={button}
            shape="medium"
            state="active"
            onClick={onClick}
          ></Button>
        )}
      </S.Contents>
    </S.Error>
  );
};
