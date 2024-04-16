import { memo } from "react";
import cls from './AppLogo.module.scss';
import AppLogotype from './../../assets/main.svg';

interface AppLogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export const AppLogo = memo( (props: AppLogoProps) => {
    const {
        width,
        height,
        className,
    } = props;

    return (
        <div className={className}>
            <img
                src={AppLogotype}
                width={width}
                height={height}
                className={cls.AppLogo}
                alt={'Logotype'}
            />
        </div>
    );
});