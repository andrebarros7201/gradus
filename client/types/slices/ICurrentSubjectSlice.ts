import { ISubjectComplete } from "../interfaces/ISubjectComplete";

export interface ICurrentSubjectSlice {
  currentSubject: ISubjectComplete | null;
  isLoading: boolean;
}
