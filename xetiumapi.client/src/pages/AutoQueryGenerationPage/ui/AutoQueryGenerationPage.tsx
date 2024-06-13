import {CreateRequest} from "@/widgets/CreateRequest1/ui/CreateRequest.tsx";
import cls from "@/pages/AutoQueryGenerationPage/ui/AutoQueryGenerationPage.module.scss";
import {InfoBlock} from "@/entity/InfoBlock/ui/InfoBlock.tsx";
import {ResultGeneration} from "@/widgets/ResultGeneration/ui/ResultGeneration.tsx";

export const AutoQueryGenerationPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <CreateRequest/>
                <InfoBlock/>
            </div>
            <ResultGeneration/>
        </div>
    );
};
