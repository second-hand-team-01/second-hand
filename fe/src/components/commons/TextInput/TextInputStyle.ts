import styled from 'styled-components';

export interface WrapStyleProps {
  height: number;
  hasLabel: boolean;
}

export const Wrap = styled.div<WrapStyleProps>`
  display: grid;
  grid-template-columns: ${({ hasLabel }) => (hasLabel ? '72px 1fr' : '1fr')};
  gap: 8px;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  height: ${({ height }) => height}px;
  &:focus-within {
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.body.size};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  display: grid;
  align-items: center;
  justify-items: start;
`;

export const TextInput = styled.input`
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.body.size};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  caret-color: ${({ theme }) => theme.colors.systemDefault};
  display: grid;
  align-items: center;
  justify-items: start;
  &:placeholder {
    color: ${({ theme }) => theme.colors.neutralTextWeak};
  }
`;
