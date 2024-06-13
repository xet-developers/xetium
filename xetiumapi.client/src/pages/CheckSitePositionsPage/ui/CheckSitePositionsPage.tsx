import cls from "@/pages/AutoQueryGenerationPage/ui/AutoQueryGenerationPage.module.scss";
import { AddKeyWords } from "@/widgets/AddKeyWords/ui/AddKeyWords.tsx";
import {Clusters} from "@/features/Clusters/ui/Clusters.tsx";
import {SitePositionTable} from "@/widgets/SitePositionTable";

export const CheckSitePositionsPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <AddKeyWords/>
                <Clusters/>
            </div>
            <SitePositionTable/>
        </div>
    );
};
