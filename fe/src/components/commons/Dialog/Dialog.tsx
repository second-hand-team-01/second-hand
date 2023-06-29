import icons from '@assets/icons';
import * as S from './DialogStyle';
import { Button, Portal } from '@commons/index';
import { ReactNode } from 'react';
import { DialogStyleProps } from './DialogStyle';
import { colors } from '@styles/Color';

interface DialogProps extends DialogStyleProps {
  isOpen: boolean;
  children: ReactNode;
  btnInfos: { left?: BtnInfo; right?: BtnInfo };
  handleBackDropClick: () => void;
}

interface BtnInfo {
  text: string;
  icon?: keyof typeof icons;
  color?: keyof typeof colors;
  onClick: () => void;
}

const getColor = (key: string, value: BtnInfo) => {
  if (value.color) {
    return value.color;
  }
  if (key === 'right') {
    return 'neutralTextStrong';
  }
  return 'neutralText';
};

export const Dialog = ({
  isOpen,
  btnInfos,
  children,
  handleBackDropClick,
  width = 240,
}: DialogProps) => {
  return isOpen ? (
    <Portal id="modal-root">
      <S.Dialog width={width}>
        <S.Contents>
          <p>{children}</p>
        </S.Contents>
        <S.Footer>
          {Object.entries(btnInfos).map((info) => {
            const [key, value] = info;
            return (
              <Button
                key={key}
                color={getColor(key, value)}
                title={value.text}
                icon={value.icon ?? undefined}
                onClick={value.onClick}
                textAlign="center"
                hasBorderRadius={false}
                shape="large"
              ></Button>
            );
          })}
        </S.Footer>
      </S.Dialog>
      <S.Backdrop onClick={handleBackDropClick}></S.Backdrop>
    </Portal>
  ) : (
    <></>
  );
};
