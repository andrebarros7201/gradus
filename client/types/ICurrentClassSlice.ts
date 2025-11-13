import { IClassComplete } from './IClassComplete';

export interface ICurrentClassSlice {
  isLoading: boolean;
  currentClass: IClassComplete | null;
}
