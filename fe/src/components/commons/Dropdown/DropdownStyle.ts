import styled from 'styled-components';

export const Dropdown = styled.button`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: auto auto;
  gap: 4px;
  width: fit-content;
  font-weight: ${({ theme }) => theme.typography.headline.fontWeight};
  font-size: ${({ theme }) => theme.typography.headline.size};
  line-height: ${({ theme }) => theme.typography.headline.lineHeight};
  border-radius: 100%;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;
