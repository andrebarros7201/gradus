import { ISubjectComplete } from "./ISubjectComplete";

export interface ICurrentSubjectSlice {
  currentSubject: ISubjectComplete | null;
  isLoading: boolean;
}
