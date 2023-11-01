import { Button } from '@commons/index';
import { convertNumToPrice } from '@utils/common/common';
import * as S from './InfoBarStyle';

export interface InfoBarProps {
  isInterestedChecked?: boolean;
  price?: number;
  handleInterestClicked?: (e: React.MouseEvent) => Promise<void>;
  handleChatClicked?: () => void;
  isWriter?: boolean;
  chat?: number;
}

export const InfoBar = ({
  isInterestedChecked,
  price,
  handleInterestClicked,
  handleChatClicked,
  isWriter,
  chat,
}: InfoBarProps) => {
  return (
    <S.InfoBar>
      <Button
        icon={isInterestedChecked ? 'heartFill' : 'heart'}
        onClick={handleInterestClicked}
        shape="ghost"
      ></Button>
      {price ? `${convertNumToPrice(price)}원` : '가격 미정'}
      <Button
        title={
          isWriter
            ? `대화 중인 채팅방${chat && chat !== 0 ? ` (${chat})` : ''}`
            : '채팅하기'
        }
        shape="small"
        isWidthFitContent={true}
        backgroundColor="accentBackgroundPrimary"
        color="accentText"
        onClick={handleChatClicked}
      ></Button>
    </S.InfoBar>
  );
};
