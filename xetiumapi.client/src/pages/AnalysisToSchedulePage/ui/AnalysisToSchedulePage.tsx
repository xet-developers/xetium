import cls from './AnalysisToSchedulePage.module.scss';
import {SideBar} from "@/widgets/Sidebar";
import {CalendarWidget} from "@/widgets/Calendar/ui/CalendarWidget.tsx";
import {Header} from "@/features/Header/ui/Header.tsx";


export const AnalysisToSchedulePage = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <SideBar/>

            <div className={cls.page}>
                <Header name="Расписание проверки позиций"/>
                <CalendarWidget/>
            </div>
        </div>
    );
};
