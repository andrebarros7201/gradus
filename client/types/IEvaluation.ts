import { IGradeSimple } from './IGradeSimple';

export interface IEvaluation {
  id: number;
  name: string;
  date: string;
  evaluationType: number;
  subjectId: number;
  grades: IGradeSimple[];
}
