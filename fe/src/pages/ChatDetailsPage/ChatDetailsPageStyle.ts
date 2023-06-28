import styled from 'styled-components';

interface ChatListStyleProps {
  hasChat: boolean;
}

export const ChatDetailsPage = styled.div`
  display: grid;
  border: none;
  background: none;
  text-align: left;
  width: 100%;
  padding: 16px;
  gap: 8px;
`;

export const HeaderBottomWrap = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 48px 1fr;
  gap: 8px;
`;

export const Contents = styled.div``;

export const Title = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
  color: ${({ theme }) => theme.colors.neutralText};
`;

export const Price = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.neutralText};
`;

export const Preview = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  background-size: cover;
`;
