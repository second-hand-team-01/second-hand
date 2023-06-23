import styled from 'styled-components';

export const Backdrop = styled.div`
  width: 100%;
  height: 100dvh;
`;

export const SnackBar = styled.div`
  width: calc(100% - 40px);
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background-color: ${({ theme }) => theme.palette.gray900};
  color: ${({ theme }) => theme.colors.accentText};
  position: fixed;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;
  padding: 12px 16px;
  gap: 4px;
}
`;

export const Contents = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
`;

export const Footer = styled.div`
  display: flex;
`;
