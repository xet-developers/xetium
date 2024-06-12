import cls from "@/pages/ReportsPage/ui/ReportsPage.module.scss";
import {CreateReport} from "@/widgets/CreateReport/ui/CreateReport.tsx";
import {InfoReport} from "@/entity/InfoReport/ui/InfoReport.tsx";
import {ResultReportTable} from "@/widgets/ResultReportTable/ui/ResultReportTable.tsx";

export const ReportsPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <CreateReport/>
                <InfoReport/>
            </div>
            <ResultReportTable/>
        </div>
    );
};
