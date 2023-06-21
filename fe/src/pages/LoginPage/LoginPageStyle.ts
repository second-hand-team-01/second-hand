import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 56px 0 83px 0;
  padding-top: 56px;
  padding-bottom: 83px;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 70px;
`;

export const UserId = styled.span`
  padding-top: 30px;
  font-size: ${({ theme }) => theme.typography.body.size};
  line-height: ${({ theme }) => theme.typography.headline.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  gap: 20px;
`;

export const LoginButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 0 30px 100px 30px;
`;

export const AlertText = styled.span`
  padding-left: 13px;
  font-size: ${({ theme }) => theme.typography.caption2.size};
  line-height: ${({ theme }) => theme.typography.caption2.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  color: ${({ theme }) => theme.colors.systemWarning};
`;
