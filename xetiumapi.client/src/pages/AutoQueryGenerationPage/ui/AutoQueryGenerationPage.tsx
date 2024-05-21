import {CreateRequest} from "@/widgets/CreateRequest/ui/CreateRequest.tsx";
import cls from "@/pages/AnalysisToSchedulePage/ui/AnalysisToSchedulePage.module.scss";

export const AutoQueryGenerationPage = () => {
    return (
        <div className={cls.page}>
            <CreateRequest/>
        </div>
    );
};
