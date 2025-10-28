import classes from './header.module.scss';
import { HeaderLink } from './headerLink/HeaderLink';

export const Header = () => {
  return (
    <div className={classes.header}>
      <h2>Gradus</h2>
      <div className={classes['header-group']}>
        <HeaderLink label="Register" href="/register" />
        <HeaderLink label="Login" href="/login" />
      </div>
    </div>
  );
};

