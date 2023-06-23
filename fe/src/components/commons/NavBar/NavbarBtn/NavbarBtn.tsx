import icons from '@assets/icons';
import { Button } from '@commons/index';
import { colors } from '@styles/Color';
import { useNavigate } from 'react-router-dom';

interface NavigateBtnProps {
  text?: string;
  icon?: keyof typeof icons;
  path?: string | 'back';
  onClick?: () => void;
  color?: keyof typeof colors;
}

export const NavbarBtn = ({
  text,
  icon,
  path,
  onClick,
  color = 'neutralText',
}: NavigateBtnProps) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    path && (path === 'back' ? navigate(-1) : navigate(path));
    onClick && onClick();
  };
  return (
    <Button
      onClick={handleOnClick}
      title={text}
      icon={icon}
      shape="ghost"
      color={color}
      backgroundColor="transparent"
    ></Button>
  );
};
