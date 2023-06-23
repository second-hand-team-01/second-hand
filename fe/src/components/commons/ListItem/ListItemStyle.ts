import styled from 'styled-components';

export const ListItem = styled.li`
  width: calc(100% + 32px);

  list-style: none;
  display: grid;

  cursor: pointer;
  justify-items: center;
  align-items: center;
  margin: 0 -16px;

  &:first-child {
    border: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutralBackgroundWeak};
  }
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
  gap: 15px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  width: calc(100% - 32px);
  height: 100%;
`;

export const Thumbnail = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-radius: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 120px;
  padding: 4px 0px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 68px;
  gap: 4px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  & span {
    font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
    font-size: ${({ theme }) => theme.typography.subhead.size};
    line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  }

  & button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const SubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & span {
    font-weight: ${({ theme }) => theme.typography.footnote.fontWeight};
    font-size: ${({ theme }) => theme.typography.footnote.size};
    line-height: ${({ theme }) => theme.typography.footnote.lineHeight};
    color: ${({ theme }) => theme.colors.neutralTextWeak};
  }
`;

export const States = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  & span {
    font-weight: ${({ theme }) => theme.typography.headline.fontWeight};
    font-size: ${({ theme }) => theme.typography.headline.size};
    line-height: ${({ theme }) => theme.typography.headline.lineHeight};
  }
`;

export const StateBadge = styled.div`
  display: flex;
  align-items: center;

  height: 22px;
  padding: 10px 8px;
  gap: 10px;
  border-radius: 8px;

  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.size};
  line-height: ${({ theme }) => theme.typography.caption1.lineHeight};
  background-color: ${({ theme }) => theme.colors.accentBackgroundSecondary};
  color: ${({ theme }) => theme.colors.neutralBackground};
`;

export const ChatAndLike = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

export const ChatAndLikeInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 33px;
  height: 22px;
  gap: 4px;

  font-weight: ${({ theme }) => theme.typography.footnote.fontWeight};
  font-size: ${({ theme }) => theme.typography.footnote.size};
  line-height: ${({ theme }) => theme.typography.footnote.lineHeight};
`;
