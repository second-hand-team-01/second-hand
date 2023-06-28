import styled from 'styled-components';

export const ChatBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 28px;
  padding: 6px 16px;
  align-items: center;
  gap: 4px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.neutralBackgroundBlur};
`;

export const TextInputWrap = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.neutralBackground};
`;
