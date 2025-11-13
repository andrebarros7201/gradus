import { IGradeSimple } from "./IGradeSimple";

export interface IEvaluation {
  id: number;
  name: string;
  date: Date;
  subjectId: number;
  grades: IGradeSimple[];
}
