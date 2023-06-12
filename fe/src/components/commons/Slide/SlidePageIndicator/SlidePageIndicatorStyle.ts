import styled from 'styled-components';

export const SlidePageIndicator = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  z-index: 1;
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Element = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.3);

  &:last-child {
    margin: 0;
  }

  &.active {
    background-color: ${({ theme }) => theme.palette.white};
  }
`;
