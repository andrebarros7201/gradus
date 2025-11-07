import { IClassComplete } from "./IClassComplete";

export interface ICurrentClass {
    isLoading: boolean;
    currentClass: IClassComplete | null
}
