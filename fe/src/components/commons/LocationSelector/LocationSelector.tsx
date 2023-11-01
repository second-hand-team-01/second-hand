import * as S from './LocationSelectorStyle';
import { BottomSheet } from '@components/commons';
import { isSelectedLocation } from '@services/locations/locations';
import { LocationData } from '@type-store/services/location';
import { Location } from '@stores/UserContext';

interface LocationSelectorProps {
  userInfo;
  locationData: LocationData[] | null;
  isLocationSelectorOpen: boolean;
  addUserLocationHandler?: (newLocation, userMainLocation) => void;
  setSelectedLocationHandler?: (locationData) => void;
  locationSelectorHandler: () => void;
  selectedLocation?: Location | null;
}

export const LocationSelector = ({
  userInfo,
  locationData,
  isLocationSelectorOpen,
  addUserLocationHandler,
  setSelectedLocationHandler,
  locationSelectorHandler,
  selectedLocation,
}: LocationSelectorProps) => {
  return (
    <>
      <BottomSheet
        isOpen={isLocationSelectorOpen}
        handleBackdropClick={locationSelectorHandler}
        leftBtn={{
          text: '닫기',
          onClick: locationSelectorHandler,
        }}
      >
        {locationData?.map((locationData) => (
          <S.LocationList
            key={locationData.locationIdx}
            onClick={() =>
              addUserLocationHandler
                ? addUserLocationHandler(locationData, userInfo.main)
                : setSelectedLocationHandler &&
                  setSelectedLocationHandler(locationData)
            }
          >
            <S.LocationListInner
              color={
                isSelectedLocation(
                  selectedLocation ? selectedLocation : userInfo?.main,
                  locationData
                )
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
