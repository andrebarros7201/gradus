import { IEvaluation } from './IEvaluation';

export interface ISubjectComplete {
  id: number;
  name: string;
  professorId: number;
  professor: string;
  classId: number;
  class: string;
  evaluations: IEvaluation[];
}
