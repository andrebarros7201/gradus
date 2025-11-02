import { ReactNode } from 'react';
import classes from './select.module.scss';

type Props = {
  label: string;
  children: ReactNode | ReactNode[];
  ref: React.Ref<HTMLSelectElement>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
};

export const Select = ({ label, children, ref, onChange, isDisabled = false }: Props) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes['wrapper__label']}>{label}</label>
      <select
        className={classes['wrapper__select']}
        ref={ref}
        onChange={onChange}
        disabled={isDisabled}
      >
        {children}
      </select>
    </div>
  );
};
