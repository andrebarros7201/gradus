import { IClassComplete } from './IClassComplete';
import { IGradeSimple } from './IGradeSimple';

export interface IStudentComplete {
  id: number;
  name: string;
  class: IClassComplete;
  grades: IGradeSimple[];
}
