import cls from "@/pages/AutoQueryGenerationPage/ui/AutoQueryGenerationPage.module.scss";
import { AddKeyWords } from "@/widgets/AddKeyWords/ui/AddKeyWords.tsx";
import {Clusters} from "@/features/Clusters/ui/Clusters.tsx";
import {ResultCheckTable} from "@/widgets/ResultCheckTable/ui/ResultCheckTable.tsx";

export const CheckSitePositionsPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <AddKeyWords/>
                <Clusters/>
            </div>
            <ResultCheckTable/>
        </div>
    );
};
