import classes from './input.module.scss';

type Props = {
  label: string;
  required?: boolean;
  type: 'text' | 'number' | 'password';
  placeholder?: string;
  minValue: number;
  maxValue: number;
  ref: React.Ref<HTMLInputElement>;
};

export function Input({
  label,
  required = true,
  type,
  minValue,
  maxValue,
  placeholder,
  ref,
}: Props) {
  return (
    <div className={classes['wrapper']}>
      <label className={classes['wrapper__label']} htmlFor={label}>{label}</label>
      <input
        className={classes['wrapper__input']}
        id={label}
        required={required}
        type={type}
        {...(type === 'number'
          ? { max: maxValue, min: minValue }
          : { maxLength: maxValue, minLength: minValue })}
        ref={ref}
        placeholder={placeholder}
      />
    </div>
  );
}
