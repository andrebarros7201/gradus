import { ReactNode } from 'react';
import classes from './modal.module.scss';

type Props = {
  children: ReactNode | ReactNode[];
  onClose: () => void;
  title?: string;
};

export const Modal = ({ children, onClose, title }: Props) => {
  return (
    <div className={classes.modal} onClick={onClose}>
      <div className={classes['modal__content']} onClick={(e) => e.stopPropagation()}>
        <div className={classes['modal__top']}>
          <h4 className={classes['modal__title']}>{title}</h4>
          <button className={classes['modal__close-button']} onClick={onClose}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
