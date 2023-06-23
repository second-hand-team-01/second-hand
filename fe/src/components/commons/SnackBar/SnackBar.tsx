import * as S from './SnackBarStyle';
import { Button } from '@commons/index';
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface BtnInfo {
  text: string;
  onClick: () => void;
}

interface SnackProps {
  isOpen: boolean;
  children: ReactNode;
  btnInfos: BtnInfo;
}

export const SnackBar = ({ isOpen, btnInfos, children }: SnackProps) => {
  return (
    isOpen &&
    createPortal(
      <S.SnackBar>
        <S.Contents>{children}</S.Contents>
        <S.Footer>
          <Button
            title={btnInfos.text}
            onClick={btnInfos.onClick}
            shape="ghost"
            color="accentBackgroundPrimary"
          ></Button>
        </S.Footer>
      </S.SnackBar>,
      document.querySelector('#modal-root') ?? document.body
    )
  );
};
