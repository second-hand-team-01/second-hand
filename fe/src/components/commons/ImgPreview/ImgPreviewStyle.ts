import styled from 'styled-components';

export const ImgPreview = styled.div`
  display: flex;
  padding: 16px 0;
  gap: 16px;
  overflow-x: scroll;
`;

export const ImgContainer = styled.div`
  width: max-content;
  display: flex;
  gap: 16px;
  height: 80px;
`;

export const Img = styled.img`
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-radius: 12px;
`;

export const FileInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
`;

export const FileUploadBtn = styled.label`
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: grid;
  grid-template-rows: max-content max-content;
  align-content: center;
  justify-items: center;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutralBorder};
  border-radius: 12px;
`;
