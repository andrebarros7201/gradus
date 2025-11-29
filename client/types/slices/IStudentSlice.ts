import { IStudentComplete } from '../interfaces/IStudentComplete';
import { IStudentSimple } from '../interfaces/IStudentSimple';

export interface IStudentSlice {
  isLoading: boolean;
  currentStudent: IStudentComplete | null;
  studentList: IStudentSimple[];
  pages: number | null;
}
