"use client";

import Link from 'next/link';
import classes from './headerLink.module.scss';
import { usePathname } from 'next/navigation';

type Props = {
    label: string;
    href: string;
}
export const HeaderLink = ({ label, href }: Props) => {
    const pathName = usePathname();

    return (
        <Link className={`${classes.link} ${pathName === href ? classes.active : null}`} href={href}>
            {label}
        </Link>
    );
}
