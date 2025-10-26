import classes from './form.module.scss';
import { ReactNode } from 'react';

type Props = {
  label?: string;
  onSubmit: () => void;
  children: ReactNode | ReactNode[];
};
export const Form = ({ label, onSubmit, children }: Props) => {
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {label && <h4>{label}</h4>}
      {children}
    </form>
  );
};
