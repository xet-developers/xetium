import cls from "@/pages/AnalysisToSchedulePage/ui/AnalysisToSchedulePage.module.scss";
import {RawModal} from "@/shared/ui/components/RawModal/RawModal.tsx";


export const CreateCheckModal = ({modalOpen, closeModal}):React.JSX.Element => {
    return (
        <RawModal isOpen={modalOpen} onClose={closeModal} className={cls.Modal} textBtn={'Отмена'}>
            <div>
                <div className={cls.blockData}>
                    Data
                </div>

                <div className={cls.blockData}>
                    Time
                </div>

                <div className={cls.blockData}>
                    Repeat
                </div>

                <div className={cls.blockData}>
                    Klaster
                </div>

                <div className={cls.blockData}>
                    Search system
                </div>

            </div>
        </RawModal>
    );
};
