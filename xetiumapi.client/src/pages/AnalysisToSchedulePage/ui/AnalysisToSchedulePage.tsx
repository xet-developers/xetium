import cls from './AnalysisToSchedulePage.module.scss';
import {CalendarWidget} from "@/widgets/Calendar/ui/CalendarWidget.tsx";


export const AnalysisToSchedulePage = () => {

    return (
        <div className={cls.page}>
            <CalendarWidget/>
        </div>
    );
};
