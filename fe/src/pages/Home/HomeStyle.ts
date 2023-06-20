import styled from 'styled-components';

export const Home = styled.div`
  padding: 0 16px;
  height: 100%;
`;

export const Error = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  color: ${({ theme }) => theme.colors.neutralTextWeak};
`;

export const InitialLoading = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

export const NextPageLoading = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
`;
