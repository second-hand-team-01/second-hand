import * as S from './LocationSelectorStyle';
import { BottomSheet } from '@components/commons';
import { isSelectedLocation } from '@services/locations/locations';

interface LocationData {
  locationIdx: number | null;
  locationName: string | null;
  city: string | null;
  district: string | null;
  town: string | null;
}

interface LocationSelectorProps {
  userInfo;
  locationData: LocationData[] | null;
  isLocationSelectorOpen: boolean;
  setIsLocationSelectorOpen: (isOpen: boolean) => void;
  locationClickHandler: (town: string | null) => void;
}

export const LocationSelector = ({
  userInfo,
  locationData,
  isLocationSelectorOpen,
  setIsLocationSelectorOpen,
  locationClickHandler,
}: LocationSelectorProps) => {
  return (
    <>
      <BottomSheet
        isOpen={isLocationSelectorOpen}
        handleBackdropClick={() => setIsLocationSelectorOpen(false)}
        leftBtn={{
          text: '닫기',
          onClick: () => setIsLocationSelectorOpen(false),
        }}
      >
        {locationData?.map((locationData) => (
          <S.LocationList
            key={locationData.locationIdx}
            onClick={() => locationClickHandler(locationData.town)}
          >
            <S.LocationListInner
              color={
                isSelectedLocation(userInfo, locationData.locationIdx)
                  ? 'accentBackgroundPrimary'
                  : 'neutralText'
              }
            >
              {locationData.locationName}
            </S.LocationListInner>
          </S.LocationList>
        ))}
      </BottomSheet>
    </>
  );
};
