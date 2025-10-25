import { IAdmin } from "./IAdmin";
import { IClass } from "./IClass";
import { IProfessor } from "./IProfessor";

export interface IUser {
  id: number;
  name: string;
  username: string;
  role: number;
  admin?: IAdmin;
  class?: IClass;
  professor?: IProfessor;
}
