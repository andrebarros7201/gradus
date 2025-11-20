import { IStudentComplete } from './IStudentComplete';
import { IStudentSimple } from './IStudentSimple';

export interface IStudentSlice {
  isLoading: boolean;
  currentStudent: IStudentComplete | null;
  studentList: IStudentSimple[];
}
