import { IUser } from './IUser';

export interface IUserSlice {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
}
