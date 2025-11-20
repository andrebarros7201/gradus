import { IUser } from '../interfaces/IUser';

export interface IUserSlice {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
}
