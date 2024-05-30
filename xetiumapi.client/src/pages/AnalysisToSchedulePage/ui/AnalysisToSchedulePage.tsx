import cls from './AnalysisToSchedulePage.module.scss';
import {CalendarWidget} from "@/widgets/Calendar/ui/CalendarWidget.tsx";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader.tsx";
import {ProjectSliceReducer} from "@/entity/Project";

const reducers: ReducersList = {
    project:ProjectSliceReducer ,
};
export const AnalysisToSchedulePage = () => {

    return (
        <div className={cls.page}>
            <DynamicModuleLoader reducers={reducers}>
                <CalendarWidget/>
            </DynamicModuleLoader>
        </div>
    );
};
