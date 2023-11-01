import * as S from './LocationPopupStyle';
import { BottomSheet, Button } from '@components/commons';
import { Location } from '@stores/UserContext';

interface LocationPopupProps {
  userInfo;
  isLocationPopupOpen: boolean;
  selectedLocation: Location | null | undefined;
  locationPopupHandler: () => void;
  locationPopupClickHandler: (locationIdx, town) => void;
  removeUserLocationHandler: (
    selectedLocationIdx,
    userMainLocationIdx,
    userSubLocationIdx
  ) => void;
  locationSelectorHandler: () => void;
}

export const LocationPopup = ({
  userInfo,
  isLocationPopupOpen,
  selectedLocation,
  locationPopupHandler,
  locationPopupClickHandler,
  removeUserLocationHandler,
  locationSelectorHandler,
}: LocationPopupProps) => {
  return (
    <BottomSheet
      title="동네 설정"
      isOpen={isLocationPopupOpen}
      handleBackdropClick={locationPopupHandler}
      leftBtn={{
        text: '닫기',
        onClick: locationPopupHandler,
      }}
    >
      <S.LocationPopup>
        <S.AlertTextSection>
          <S.AlertText>지역은 최소 1개</S.AlertText>
          <S.AlertText>최대 2개까지 설정 가능해요.</S.AlertText>
        </S.AlertTextSection>
        <S.LocationButtonSection>
          <Button
            title={userInfo.main.town}
            shape="large"
            state={
              userInfo.main.town === selectedLocation?.town
                ? 'active'
                : 'default'
            }
            textAlign="left"
            color={
              userInfo.main.town === selectedLocation?.town
                ? 'systemBackground'
                : 'neutralTextStrong'
            }
            icon="close"
            hasBorder={true}
            onClick={() =>
              locationPopupClickHandler(
                userInfo.main.locationIdx,
                userInfo.main.town
              )
            }
            iconClickHandler={() =>
              removeUserLocationHandler(
                userInfo.main.locationIdx,
                userInfo.main.locationIdx,
                userInfo.sub.locationIdx
              )
            }
          />
          <Button
            title={userInfo.sub.town ? userInfo.sub.town : '위치 추가'}
            shape="large"
            state={
              userInfo.sub.town === selectedLocation?.town
                ? 'active'
                : 'default'
            }
            color={
              userInfo.sub.town === selectedLocation?.town
                ? 'systemBackground'
                : 'neutralTextStrong'
            }
            textAlign={userInfo.sub.town ? 'left' : 'center'}
            icon={userInfo.sub.town ? 'close' : 'plus'}
            hasBorder={true}
            onClick={
              userInfo.sub.town
                ? () =>
                    locationPopupClickHandler(
                      userInfo.sub.locationIdx,
                      userInfo.sub.town
                    )
                : () => locationSelectorHandler()
            }
            iconClickHandler={
              userInfo.sub.town
                ? () =>
                    removeUserLocationHandler(
                      userInfo.sub.locationIdx,
                      userInfo.main.locationIdx,
                      userInfo.sub.locationIdx
                    )
                : () => locationSelectorHandler()
            }
          />
        </S.LocationButtonSection>
      </S.LocationPopup>
    </BottomSheet>
  );
};
