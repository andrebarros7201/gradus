import Link from 'next/link';
import classes from './header.module.scss';

export const Header = () => {
  return (
    <div className={classes.header}>
      <h2>Gradus</h2>
      <div className={classes['header-group']}>
        <Link href={'/register'}>Register</Link>
        <Link href={'/login'}>Login</Link>
      </div>
    </div>
  );
};

