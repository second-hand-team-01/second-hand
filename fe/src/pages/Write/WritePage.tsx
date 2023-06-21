import { TextInput, ImgPreview } from '@components/commons';
import { useNavigate } from 'react-router-dom';

interface WritePageProps {
  status: 'write' | 'edit';
}

export const WritePage = ({ status }: WritePageProps) => {
  return (
    <>
      <ImgPreview></ImgPreview>
      <TextInput
        value={'test'}
        shape="large"
        placeholder="ddd"
        onChange={() => console.log('d')}
      ></TextInput>
    </>
  );
};
