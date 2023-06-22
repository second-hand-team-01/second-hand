import styled from 'styled-components';
import { NAVBAR_HEIGHT } from '@constants/style';

export const DetailsPages = styled.div``;

export const Contents = styled.div`
  padding: 16px;
`;

export const WriterSection = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralBackgroundWeak};
  padding: 16px;
  color: ${({ theme }) => theme.colors.neutralText};
  display: flex;
  width: 361px;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 12px;
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.headline.fontWeight};
  font-size: ${({ theme }) => theme.typography.headline.size};
  line-height: ${({ theme }) => theme.typography.headline.lineHeight};
`;

export const Info = styled.span`
  font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  color: ${({ theme }) => theme.colors.neutralTextWeak};
`;

export const Description = styled.p`
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  font-size: ${({ theme }) => theme.typography.body.size};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors.neutralText};
`;
