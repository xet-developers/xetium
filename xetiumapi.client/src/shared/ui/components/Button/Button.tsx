import {
    type ReactNode,
    type ButtonHTMLAttributes,
    forwardRef,
    type ForwardedRef,
} from 'react';

import { classNames } from './../../../lib/classNames/classNames.tsx';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonSize = 's' | 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
     */
    variant?: ButtonVariant;
    /**
     * Размер кнопки в соответствии с дизайн системой
     */
    size?: ButtonSize;
    /**
     * Флаг, отвечающий за работу кнопки
     */
    disabled?: boolean;
    /**
     * Содержимое кнопки
     */
    children?: ReactNode;

    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            disabled,
            size = 'm',
            addonLeft,
            addonRight,
            color = 'normal',
            ...otherProps
        } = props;

        const mods: { [p: number]: boolean | undefined } = {
            [cls.disabled]: disabled,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
        };

        return (
            <button
                className={classNames(cls.appButton, mods, [
                    className,
                    cls[variant],
                    cls[size],
                    cls[color],
                ])}
                ref={ref}
                {...otherProps}
            >
                <div>{addonLeft}</div>
                {children}
                <div>{addonRight}</div>
            </button>
        );
    },
);
