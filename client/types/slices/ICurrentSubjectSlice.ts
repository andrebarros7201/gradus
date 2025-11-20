import { ISubjectComplete } from '../interfaces/ISubjectComplete';
import { ISubjectSimple } from '../interfaces/ISubjectSimple';

export interface ICurrentSubjectSlice {
  currentSubject: ISubjectComplete | null;
  subjectList: ISubjectSimple[];
  isLoading: boolean;
}
