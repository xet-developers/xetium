import {memo, ReactNode} from "react";
import {LinkProps, NavLink} from "react-router-dom";
import cls from './AppLink.module.scss';
import { classNames } from './../../../lib/classNames/classNames.tsx';

interface AppLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        activeClassName = '',
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={() =>
                classNames(cls.AppLink, { [activeClassName]: ''}, [className])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});