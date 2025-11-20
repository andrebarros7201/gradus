import { IUserProfessor } from '../interfaces/IUser';

export interface IProfessorSlice {
  professorList: IUserProfessor[] | null;
  isLoading: boolean;
}
