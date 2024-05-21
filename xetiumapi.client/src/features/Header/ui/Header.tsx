import  {FC, memo, useMemo} from 'react';
import cls from "./Header.module.scss";
import { useLocation } from 'react-router-dom';

type HeaderProps = {
    name?: string;
};

export const Header: FC<HeaderProps> = memo(() => {
    const location = useLocation()


    const handlePathChange = useMemo(() => {

        switch (window.location.pathname) {
            case '/analysistoschedule':
                return 'Расписание проверки позиций';
            case '/reports':
                return 'Отчеты'
            default:
                return'';
        }
    }, [location]);

    return (
        <div className={cls.headerSpace}>
            <span className={cls.header}>{handlePathChange}</span>
        </div>
    );
});


