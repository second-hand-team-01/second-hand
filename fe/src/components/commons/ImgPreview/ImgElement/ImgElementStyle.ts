import styled from 'styled-components';

export const ImgWrap = styled.div`
  position: relative;
`;

export const Img = styled.img`
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-radius: 12px;
`;

export const Thumbnail = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutralOverlay};
  width: 80px;
  height: 24px;
  border-radius: 0 0 12px 12px;
  color: ${({ theme }) => theme.colors.accentText};
  justify-items: center;
  align-items: center;
  display: grid;
  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.size};
  line-height: ${({ theme }) => theme.typography.caption1.lineHeight};
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -4px;
  margin-right: -4px;
  background-color: ${({ theme }) => theme.palette.black};
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
