import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 56px 10px 0 10px;
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
  width: 100%;
  gap: 20px;
`;

export const LoginButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding-bottom: 100px;
`;
