import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.neutralBackgroundBold};
  border-radius: 8px;
  width: fit-content;
`;

export const Tab = styled.button`
  width: 118px;
  text-align: center;
  height: 28px;
  border: none;
  color: ${({ theme }) => theme.colors.neutralText};

  &:hover {
    cursor: pointer;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.neutralBackground};
    border: 0.5px solid ${({ theme }) => theme.colors.neutralBorder};
    border-radius: 7px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
  }
`;
