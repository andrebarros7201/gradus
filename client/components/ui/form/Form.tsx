import classes from './form.module.scss';
import { FormEvent, ReactNode } from 'react';

type Props = {
  label?: string;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode | ReactNode[];
};
export const Form = ({ label, onSubmit, children }: Props) => {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {label && <h3 className={classes.title}>{label}</h3>}
      {children}
    </form>
  );
};
