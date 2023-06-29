import styled from 'styled-components';

export const SignUpPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 80px 10px 0 10px;
  gap: 40px;
`;

export const ProfileImgInput = styled.div``;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const LocationButtonSection = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;

export const AlertText = styled.span`
  padding-left: 13px;
  font-size: ${({ theme }) => theme.typography.caption2.size};
  line-height: ${({ theme }) => theme.typography.caption2.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  color: ${({ theme }) => theme.colors.systemWarning};
`;

export const LocationList = styled.li`
  height: 52px;
  font-size: ${({ theme }) => theme.typography.subhead.size};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  margin: 0 -16px;
  padding: 0 16px;
  cursor: pointer;
  list-style-type: none;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.neutralBackgroundWeak};
  }
  &:last-child {
    border-bottom: 0;
  }
`;

export const LocationListInner = styled.div<{ color: string }>`
  height: 100%;
  display: grid;
  align-items: center;
  ${({ color, theme }) => color && `color: ${theme.colors[color]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
`;
