import styled from 'styled-components';

export const LocationPopup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;

export const AlertTextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 30px;
  gap: 8px;
`;

export const AlertText = styled.div`
  font-size: ${({ theme }) => theme.typography.subhead.size};
  line-height: ${({ theme }) => theme.typography.subhead.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;

export const LocationButtonSection = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;
