import React, { useContext } from 'react';
import cls from "./Header.module.scss";
import {HeaderContext} from "@/app/consts/routes/HeaderContext.ts";

type HeaderProps = {
    name?: string;
};

export const Header: React.FC<HeaderProps> = () => {
    const { headerName }: any = useContext(HeaderContext);

    return (
        <div className={cls.headerSpace}>
            <span className={cls.header}>{headerName}</span>
        </div>
    );
};


