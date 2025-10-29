import { ReactNode } from 'react';
import classes from './select.module.scss';

type Props = {
  label: string;
  children: ReactNode | ReactNode[];
  ref: React.Ref<HTMLSelectElement>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({ label, children, ref, onChange }: Props) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes['wrapper__label']}>{label}</label>
      <select className={classes['wrapper__select']} ref={ref} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};
