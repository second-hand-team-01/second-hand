export interface State {
  id: { value: string; isValid: boolean | null; isTouched?: boolean };
  password: { value: string; isValid: boolean | null; isTouched?: boolean };
  mainLocation: {
    locationIdx: number | null;
    locationName: string | null;
  };
  subLocation: {
    locationIdx: number | null;
    locationName: string | null;
  };
  imgUrl: string | null;
}

interface LocationInfo {
  locationIdx: number;
  locationName: string;
}

export interface Action {
  type: string;
  val: string | LocationInfo;
}
