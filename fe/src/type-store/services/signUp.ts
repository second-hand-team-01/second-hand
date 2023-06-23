export interface UserInfoBody {
  id: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
  mainLocation: { locationIdx: number; locationName: string };
  subLocation: { locationIdx: number; locationName: string };
  imgUrl: string;
}
