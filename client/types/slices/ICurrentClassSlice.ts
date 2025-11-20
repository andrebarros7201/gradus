import { IClassComplete } from "../interfaces/IClassComplete";

export interface ICurrentClassSlice {
  isLoading: boolean;
  currentClass: IClassComplete | null;
}
