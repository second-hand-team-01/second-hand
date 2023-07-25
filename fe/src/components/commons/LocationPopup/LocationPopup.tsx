import * as S from './LocationPopupStyle';
import { BottomSheet, Button } from '@components/commons';

interface LocationPopupProps {
  userInfo;
  isLocationPopupOpen: boolean;
  setIsLocationPopupOpen: (isOpen: boolean) => void;
  removeLocationHandler: (town: string) => void;
  setIsLocationSelectorOpen: (isOpen: boolean) => void;
}

export const LocationPopup = ({
  userInfo,
  isLocationPopupOpen,
  setIsLocationPopupOpen,
  removeLocationHandler,
  setIsLocationSelectorOpen,
}: LocationPopupProps) => {
  return (
    <BottomSheet
      title="동네 설정"
      isOpen={isLocationPopupOpen}
      handleBackdropClick={() => setIsLocationPopupOpen(false)}
      leftBtn={{
        text: '닫기',
        onClick: () => setIsLocationPopupOpen(false),
      }}
    >
      <S.LocationPopup>
        <S.AlertTextSection>
          <S.AlertText>지역은 최소 1개</S.AlertText>
          <S.AlertText>최대 2개까지 설정 가능해요.</S.AlertText>
        </S.AlertTextSection>
        <S.LocationButtonSection>
          <Button
            title={userInfo.mainLocation.locationName}
            shape="large"
            state="default"
            textAlign="center"
            color="neutralTextStrong"
            icon="plus"
            hasBorder={true}
            onClick={() =>
              removeLocationHandler(userInfo.mainLocation.locationName)
            }
          />
          <Button
            title={
              userInfo.subLocation.locationName
                ? userInfo.subLocation.locationName
                : '위치 추가'
            }
            shape="large"
            state={userInfo.subLocation.locationIdx ? 'active' : 'default'}
            color={
              userInfo.subLocation.locationIdx
                ? 'systemBackground'
                : 'neutralTextStrong'
            }
            textAlign={userInfo.subLocation.locationIdx ? 'left' : 'center'}
            icon={userInfo.subLocation.locationIdx ? 'close' : 'plus'}
            hasBorder={true}
            onClick={
              userInfo.subLocation.locationIdx
                ? () => removeLocationHandler(userInfo.subLocation.town)
                : () => setIsLocationSelectorOpen(true)
            }
          />
        </S.LocationButtonSection>
      </S.LocationPopup>
    </BottomSheet>
  );
};
