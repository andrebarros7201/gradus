import { IStudentSimple } from './IStudentSimple';
import { ISubjectSimple } from './ISubjectSimple';

export interface IClassComplete {
  id: number;
  userId: number;
  name: string;
  username: string;
  schoolYear: string;
  isActive: boolean;
  students: IStudentSimple[];
  subjects: ISubjectSimple[];
}
