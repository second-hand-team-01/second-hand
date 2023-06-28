import styled from 'styled-components';

interface ChatListStyleProps {
  hasChat: boolean;
}

export const ChatList = styled.button<ChatListStyleProps>`
  display: grid;
  grid-template-columns: 48px 1fr ${({ hasChat }) => (hasChat ? ` 20px` : '')} 48px;
  border: none;
  background: none;
  text-align: left;
  width: 100%;
  padding: 16px;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  cursor: pointer;
`;

export const Contents = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
`;

export const ContentsHeader = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
`;

export const ChatNum = styled.div`
  background-color: ${({ theme }) => theme.colors.accentBackgroundPrimary};
  color: ${({ theme }) => theme.colors.accentText};
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50px;
  font-size: ${({ theme }) => theme.typography.caption2.size};
  line-height: ${({ theme }) => theme.typography.caption2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.caption2.fontWeight};
`;

export const User = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
  color: ${({ theme }) => theme.colors.neutralText};
`;

export const Timestamp = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.footnote.size};
  line-height: ${({ theme }) => theme.typography.footnote.lineHeight};
  font-weight: ${({ theme }) => theme.typography.footnote.fontWeight};
  color: ${({ theme }) => theme.colors.neutralTextWeak};
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.footnote.size};
  line-height: ${({ theme }) => theme.typography.footnote.lineHeight};
  font-weight: ${({ theme }) => theme.typography.footnote.fontWeight};
  color: ${({ theme }) => theme.colors.neutralText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Preview = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  background-size: cover;
`;
