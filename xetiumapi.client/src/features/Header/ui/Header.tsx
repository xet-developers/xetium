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
            case '/autoquerygeneration':
                return 'Автогенерация запросов';
            case '/queryclustering':
                return 'Кластеризация запросов';
            case '/checksitepositions':
                return 'Проверка позиций сайта';
            case '/reports':
                return 'Отчеты';
            case '/personalaccount':
                return 'Личный кабинет';
            case '/myproject':
                return 'Мой проект';
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


