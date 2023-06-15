import styled from 'styled-components';

export interface ProfileStyleProps {
  url?: string;
  size: number;
  isEditable: boolean;
}

export interface WrapStyleProps {
  size: number;
}

export const Wrap = styled.div<WrapStyleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
`;

export const Profile = styled.div<ProfileStyleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ isEditable, url }) =>
    isEditable
      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url('${url}')`
      : `url('${url}')`};
  background-size: cover;
  border-radius: 100%;
`;

export const Editable = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;
