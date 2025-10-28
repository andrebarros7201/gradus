import classes from './button.module.scss';

type Props = {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
};

export function Button({ label, type = 'button', disabled, variant = 'primary', onClick }: Props) {
  return (
    <button
      className={`${classes.button} ${classes[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
