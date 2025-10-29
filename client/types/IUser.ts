import { IAdmin } from './IAdmin';
import { IClass } from './IClass';
import { IProfessor } from './IProfessor';
import { Role } from './RoleEnum';

interface IBaseUser {
  id: number;
  name: string;
  username: string;
  role: Role;
}

interface IUserAdmin extends IBaseUser {
  admin: IAdmin;
}

interface IUserClass extends IBaseUser {
  class: IClass;
}

interface IUserProfessor extends IBaseUser {
  professor: IProfessor;
}

export type IUser = IUserAdmin | IUserClass | IUserProfessor | null;
