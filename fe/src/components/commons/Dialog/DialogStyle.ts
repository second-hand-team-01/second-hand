import styled from 'styled-components';

export interface DialogStyleProps {
  width?: number;
}

export const Backdrop = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.neutralOverlay};
  cursor: pointer;
`;

export const Dialog = styled.div<DialogStyleProps>`
  max-width: calc(100% - 40px);
  min-width: 240px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutralBackground};
  position: fixed;
  border-radius: 20px;
  overflow: hidden;
  width: ${({ width }) => width}px;
`;

export const Contents = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Footer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.neutralBorder};

  & button {
    border-right: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  }
`;
