import styled from 'styled-components';

export interface LoadingStyleProps {
  height?: string;
}

export const Loading = styled.div<LoadingStyleProps>`
  width: 100%;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height};
`;
