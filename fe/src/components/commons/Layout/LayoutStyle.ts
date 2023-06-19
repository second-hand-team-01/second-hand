import styled from 'styled-components';

export const Layout = styled.div`
  max-width: 393px;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.neutralBackground};
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;

export const Wrap = styled.div`
  display: grid;
  justify-items: center;
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 393px;
  width: 100%;
`;
