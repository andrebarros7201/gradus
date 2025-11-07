import { IClassComplete } from "./IClassComplete";

export interface IStudentComplete {
    id: number,
    name: string,
    class: IClassComplete,
    // grades: IGradesSimple
}