import styled from 'styled-components';

export const DetailsPages = styled.div``;

export const ImageContainer = styled.div``;

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
  margin-bottom: 16px;
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.headline.fontWeight};
  font-size: ${({ theme }) => theme.typography.headline.size};
  line-height: ${({ theme }) => theme.typography.headline.lineHeight};
  margin-bottom: 8px;
`;

export const Info = styled.span`
  display: inline-block;
  font-weight: ${({ theme }) => theme.typography.subhead.fontWeight};
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  color: ${({ theme }) => theme.colors.neutralTextWeak};

  margin-right: 8px;
`;

export const Description = styled.p`
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  font-size: ${({ theme }) => theme.typography.body.size};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors.neutralText};
  margin-top: 16px;
  margin-bottom: 16px;
`;
