export interface State {
  id: { value: string; isValid: boolean | null; isTouched?: boolean };
  password: { value: string; isValid: boolean | null; isTouched?: boolean };
  mainLocation: {
    locationIdx: number | null;
    town: string | null;
  };
  subLocation: {
    locationIdx: number | null;
    town: string | null;
  };
  imgUrl: string | null;
  imgFile: File | null;
}

export interface LocationInfo {
  locationIdx: number;
  locationName?: string;
  town?: string;
}

// TODO: any 타입 삭제
export interface Action {
  type: string;
  val: string | LocationInfo | any;
}

export type LocationDataType = {
  locationIdx: number;
  locationName: string;
  city: string;
  district: string;
  town: string;
};
