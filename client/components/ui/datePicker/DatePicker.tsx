import { ChangeEvent } from 'react';
import classes from './datePicker.module.scss';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const DatePicker = ({ onChange }: Props) => {
  const minDate = new Date().toISOString().split('T')[0];
  return (
    <div className={classes['input']}>
      <label className={classes['input__label']} htmlFor="date">
        Date
      </label>
      <input
        className={classes['input__picker']}
        min={minDate}
        type="date"
        id="date"
        onChange={onChange}
      />
    </div>
  );
};
