import { IClassComplete } from './IClassComplete';
import { IClassSimple } from './IClassSimple';

export interface IClassSlice {
  isLoading: boolean;
  classes: IClassSimple[];
  currentClass: IClassComplete | null;
}
