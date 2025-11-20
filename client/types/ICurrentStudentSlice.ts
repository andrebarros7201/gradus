import { IStudentComplete } from './IStudentComplete';

export interface ICurrentStudentSlice {
  isLoading: boolean;
  currentStudent: IStudentComplete | null;
}
