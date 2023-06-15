import styled from 'styled-components';

export interface WrapStyleProps {
  hasLabel: boolean;
  hasBackground: boolean;
  shape: 'large' | 'small';
}

export interface TextInputStyleProps {
  shape: 'large' | 'small';
}

export const Wrap = styled.div<WrapStyleProps>`
  display: flex;
  grid-template-columns: ${({ hasLabel }) => (hasLabel ? '72px 1fr' : '1fr')};
  gap: 8px;
  padding: ${({ hasBackground }) => (hasBackground ? '7px 10px' : '12px')};
  border-bottom: ${({ hasBackground }) => (hasBackground ? '0' : '1px')} solid
    ${({ theme }) => theme.colors.neutralBorder};
  height: ${({ shape }) => (shape === 'large' ? '44' : '36')}px;
  background-color: ${({ theme, hasBackground }) =>
    hasBackground
      ? theme.colors.systemBackgroundWeak
      : theme.colors.neutralBackground};
  align-items: center;
  border-radius: ${({ hasBackground }) => (hasBackground ? '10px' : '0')};
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
  min-width: max-content;
`;

export const TextInput = styled.input<TextInputStyleProps>`
  border: none;
  padding: 0;
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.systemDefault};
  display: grid;
  align-items: center;
  justify-items: start;
  width: 100%;
  font-size: ${({ theme, shape }) =>
    shape === 'large'
      ? theme.typography.body.size
      : theme.typography.subhead.size};
  line-height: ${({ theme, shape }) =>
    shape === 'large'
      ? theme.typography.body.lineHeight
      : theme.typography.subhead.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeight.re};

  &:placeholder {
    color: ${({ theme }) => theme.colors.neutralTextWeak};
  }
`;
