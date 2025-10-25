import { IUser } from "./IUser";

export interface IUserSlice {
  isLoading: boolean;
  user: IUser | null;
}
