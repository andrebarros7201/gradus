import classes from './buttonLink.module.scss';
import Link from 'next/link';
import { Button } from '../button/Button';

type Props = {
  label: string;
  href: string;
};

export const ButtonLink = ({ label, href }: Props) => {
  return (
    <Link className={classes.link} href={href}>
      <Button label={label} />
    </Link>
  );
};
