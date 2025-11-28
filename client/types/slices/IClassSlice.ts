import { IClassComplete } from '../interfaces/IClassComplete';
import { IClassSimple } from '../interfaces/IClassSimple';

export interface IClassSlice {
  isLoading: boolean;
  classes: IClassSimple[];
  pages: number | null;
  currentClass: IClassComplete | null;
}
