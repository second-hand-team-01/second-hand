import styled from 'styled-components';
import { ProfileStyleProps, WrapStyleProps } from './Profile';

export const Wrap = styled.div<WrapStyleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
  & .camera-icon {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
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
