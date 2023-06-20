import styled from 'styled-components';

export const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 83px;
  padding: 10px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.neutralBackgroundWeak};
  border-top: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;

export const Tab = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 48px;
  height: 49px;
  gap: 8px;
  cursor: pointer;
`;

export const TabTitle = styled.span`
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.caption2.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption2.size};
  line-height: ${({ theme }) => theme.typography.caption2.lineHeight};
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.neutralText};
`;
