import styled from 'styled-components';

interface BottomSheetStyleProps {
  hasSearchInput?: boolean;
}

export const BackDrop = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralOverlay};
  width: 100%;
  height: 100dvh;
  cursor: pointer;
`;

export const BottomSheet = styled.div<BottomSheetStyleProps>`
  background-color: ${({ theme }) => theme.colors.neutralBackground};
  border-radius: 14px 14px 0px 0px;
  margin-top: 58px;
  position: fixed;
  display: grid;
  grid-template-rows:
    calc(${({ hasSearchInput }) => (hasSearchInput ? '56px + 48px' : '56px')})
    1fr;
  height: calc(100dvh - 58px);
  max-width: calc(393px - 2px);
  margin-left: 1px;
  width: 100%;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  width: 100%;
  border-radius: 14px 14px 0px 0px;
  background-color: white;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
`;

export const HeaderBottom = styled.div`
  padding: 0 16px;
  height: 48px;
  display: grid;
  align-items: start;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.body.size};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Contents = styled.div`
  padding: 0 16px;
  overflow-y: scroll;
  word-break: break-word;
`;

export const ButtonContainer = styled.div`
  width: 130px;

  &:last-child {
    display: grid;
    justify-items: end;
  }
`;
