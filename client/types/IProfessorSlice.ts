import { IUserProfessor } from './IUser';

export interface IProfessorSlice {
  professorList: IUserProfessor[] | null;
  isLoading: boolean;
}
