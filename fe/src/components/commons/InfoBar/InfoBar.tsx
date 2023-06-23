import { Button } from '@commons/index';

import * as S from './InfoBarStyle';

export interface InfoBarProps {
  isInterestedChecked?: boolean;
  price?: number;
  handleInterestClicked?: () => void;
  handleChatClicked?: () => void;
}

export const InfoBar = ({
  isInterestedChecked,
  price,
  handleInterestClicked,
  handleChatClicked,
}: InfoBarProps) => {
  return (
    <S.InfoBar>
      <Button
        icon={isInterestedChecked ? 'heartFill' : 'heart'}
        onClick={handleInterestClicked}
        shape="ghost"
      ></Button>
      {price ?? '0'}
      <Button
        title="대화 중인 채팅방"
        shape="small"
        isWidthFitContent={true}
        backgroundColor="accentBackgroundPrimary"
        color="accentText"
        onClick={handleChatClicked}
      ></Button>
    </S.InfoBar>
  );
};
