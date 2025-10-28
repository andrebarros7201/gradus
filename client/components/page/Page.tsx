import { ReactNode } from 'react';
import classes from './page.module.scss';

type Props = {
  children: ReactNode | ReactNode[];
};
export const Page = ({ children }: Props) => {
  return <main className={classes['page__wrapper']}>{children}</main>;
};
