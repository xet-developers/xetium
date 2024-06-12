import cls from "@/pages/AutoQueryGenerationPage/ui/AutoQueryGenerationPage.module.scss";
import {CreateClusterRequest} from "@/widgets/CreateClusterRequest/ui/CreateClusterRequest.tsx";
import {CreateClusterRequestResult} from "@/features/CreateClusterRequestResult/ui/CreateClusterRequestResult.tsx";
import {ResultClusterTable} from "@/widgets/ResultClusterTable/ui/ResultClusterTable.tsx";

export const QueryClusteringPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <CreateClusterRequest/>
                <CreateClusterRequestResult/>
            </div>
            <ResultClusterTable/>
        </div>
    );
};
