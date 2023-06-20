import styled from 'styled-components';

export const Layout = styled.div`
  max-width: 393px;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.neutralBackground};
  border-left: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-right: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  display: grid;
  grid-template-rows: 1fr 83px;
  height: 100vh;
`;

export const Wrap = styled.div`
  display: grid;
  justify-items: center;
`;

export const Contents = styled.div`
  overflow-y: scroll;
`;

export const Footer = styled.div`
  bottom: 0;
  max-width: 393px;
  width: 100%;
`;
