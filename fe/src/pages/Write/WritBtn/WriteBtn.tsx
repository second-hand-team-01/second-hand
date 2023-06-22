import { icons } from '@assets/icons';
import { Button } from '@commons/index';
import { useNavigate } from 'react-router-dom';
import { postItemsAPI } from '@services/items/items';

interface WriteBtnProps {
  text: string;
  icon?: keyof typeof icons;
  path?: string | 'back';
  onClick?: () => void;
}

export const WriteBtn = ({ text, icon, path, onClick }: WriteBtnProps) => {
  const navigate = useNavigate();
  const handleOnClick = async () => {
    // await postItemsAPI();
  };
  return (
    <Button
      onClick={handleOnClick}
      title={text}
      icon={icon}
      shape="medium"
      color="neutralText"
    ></Button>
  );
};
