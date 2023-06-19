import styled from 'styled-components';

export const SlidePageIndicator = styled.div`
  display: flex;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72px;
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
