import classes from './card.module.scss';
import { ButtonLink } from '../buttonLink/ButtonLink';

type Props = {
  label: string;
  description: string;
  href: string;
};

export const Card = ({ label, description, href }: Props) => {
  return (
    <div className={classes.card}>
      <h3 className={classes['card__label']}>{label}</h3>
      <p className={classes['card__description']}>{description}</p>
      <ButtonLink label={`Go to ${label}`} href={href} />
    </div>
  );
};
