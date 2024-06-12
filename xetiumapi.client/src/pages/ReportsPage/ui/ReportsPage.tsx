import cls from "@/pages/ReportsPage/ui/ReportsPage.module.scss";
import catImage from '../../../shared/ui/assets/cat.jpg';

export const ReportsPage = () => {
    return (
        <div className={cls.page}>
            <img src={catImage} width={'600px'}/>

            <span className={cls.text}>
                На данный момент раздел "Отчеты" находится в разработке, совсем скоро он появится :)
            </span>
        </div>
    );
};
