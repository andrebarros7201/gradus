import Link from 'next/link';
import classes from './headerItem.module.scss';
import { usePathname } from 'next/navigation';

type Props = {
  label: string;
  href: string;
};

export const HeaderItem = (props: Props) => {
  const pathName = usePathname();

  return (
    <Link
      className={`${classes['item']} ${pathName === props.href ? classes.active : null}`}
      href={props.href}
    >
      {props.label}
    </Link>
  );
};
