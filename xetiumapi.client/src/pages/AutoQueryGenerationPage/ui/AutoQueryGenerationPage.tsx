import {CreateRequest} from "@/widgets/CreateRequest/ui/CreateRequest.tsx";
import cls from "@/pages/AutoQueryGenerationPage/ui/AutoQueryGenerationPage.module.scss";
import {InfoBlock} from "@/entity/InfoBlock/ui/InfoBlock.tsx";

export const AutoQueryGenerationPage = () => {
    return (
        <div className={cls.page}>
            <div className={cls.up}>
                <CreateRequest/>
                <InfoBlock/>
            </div>

        </div>
    );
};
