import { ReactNode } from 'react';
import * as S from './BottomSheetStyle';
import { Button, Icon, TextInput } from '@commons/index';
import { colors } from '@styles/Color';
import { icons } from '@assets/icons';
import { createPortal } from 'react-dom';

interface btnInfo {
  text: string;
  icon?: keyof typeof icons;
  onClick?: () => void;
}

interface BottomSheetProps {
  isOpen: boolean;
  children: ReactNode;
  leftBtn?: btnInfo;
  rightBtn?: btnInfo;
  title?: string;
  hasSearchInput?: boolean;
  inputValue: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackdropClick?: () => void;
}

export const BottomSheet = ({
  isOpen = false,
  leftBtn,
  rightBtn,
  title,
  hasSearchInput = false,
  children,
  inputValue,
  handleInputChange,
  handleBackdropClick,
}: BottomSheetProps) => {
  return (
    isOpen &&
    createPortal(
      <>
        <S.BottomSheet hasSearchInput={hasSearchInput}>
          <S.Header>
            <S.HeaderTop>
              <S.ButtonContainer>
                {leftBtn && (
                  <Button
                    shape="small"
                    title={leftBtn.text}
                    icon={leftBtn.icon ?? undefined}
                    onClick={leftBtn.onClick}
                    color="neutralText"
                  ></Button>
                )}
              </S.ButtonContainer>
              <S.Title>{title}</S.Title>
              <S.ButtonContainer>
                {rightBtn && (
                  <Button
                    shape="small"
                    title={rightBtn.text}
                    icon={rightBtn.icon ?? undefined}
                    onClick={rightBtn.onClick}
                    color="neutralText"
                  ></Button>
                )}
              </S.ButtonContainer>
            </S.HeaderTop>
            {hasSearchInput && handleInputChange && (
              <S.HeaderBottom>
                <TextInput
                  icon="search"
                  value={inputValue}
                  placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
                  onChange={handleInputChange}
                  hasBackground={true}
                  shape="small"
                ></TextInput>
              </S.HeaderBottom>
            )}
          </S.Header>
          <S.Contents>{children}</S.Contents>
        </S.BottomSheet>
        <S.BackDrop onClick={handleBackdropClick}></S.BackDrop>
      </>,
      document.getElementById('modal-root') as HTMLDivElement
    )
  );
};
