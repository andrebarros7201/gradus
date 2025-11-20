import { IClassComplete } from '../interfaces/IClassComplete';
import { IClassSimple } from '../interfaces/IClassSimple';

export interface IClassSlice {
  isLoading: boolean;
  classes: IClassSimple[];
  currentClass: IClassComplete | null;
}
