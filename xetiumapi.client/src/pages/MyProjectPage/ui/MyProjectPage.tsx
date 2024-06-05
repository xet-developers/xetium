import cls from "@/pages/MyProjectPage/ui/MyProjectPage.module.scss";
import {ProjectInformation} from "@/widgets/ProjectInformation/ui/ProjectInformation.tsx";
import {ResultsLast} from "@/widgets/ResultsLast/ui/ResultsLast.tsx";
import {ResultCheckTable} from "@/widgets/ResultCheckTable/ui/ResultCheckTable.tsx";

export const MyProjectPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <ProjectInformation/>
                <ResultsLast/>
            </div>
            <ResultCheckTable/>
        </div>
    );
};
