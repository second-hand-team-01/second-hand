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

interface FileInfo {
  imgUrl: string;
  imgFile: File;
}
export interface Action {
  type: string;
  val: string | LocationInfo | FileInfo;
}

export type LocationDataType = {
  locationIdx: number;
  locationName: string;
  city: string;
  district: string;
  town: string;
};

export interface UserInfoStateType {
  id: { value: string; isValid: boolean | null; isTouched: boolean };
  password: { value: string; isValid: boolean | null; isTouched: boolean };
  mainLocation: {
    locationIdx: number | null;
    town: string | null;
  };
  subLocation: {
    locationIdx: number | null;
    town: string | null;
  };
  imgUrl: string;
  imgFile: string | null;
}

export interface UserInfoType {
  memberIdx: number | null;
  loginId: string | null;
  imgUrl: string | null;
  main: {
    locationIdx: number | null;
    locationName: string | null;
  };
  sub: {
    locationIdx: number | null;
    locationName: string | null;
  };
}
