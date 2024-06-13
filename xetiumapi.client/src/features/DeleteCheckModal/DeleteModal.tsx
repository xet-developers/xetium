import cls from "./DeleteCheckModal.module.scss";
import {useState} from 'react';
import React from 'react';
import {ConfigProvider, Modal, Button} from 'antd';
import {currentProjectId, ProjectSliceActions, useDeleteProjectMutation} from "@/entity/Project";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {useSelector} from "react-redux";

export const DeleteModal = ({ open, check, cluster, project }: any): React.JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(open || false);
    const [triggerDelete] = useDeleteProjectMutation()
    const dispatch = useAppDispatch()
    const currentProjId = useSelector(currentProjectId)

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteCheck = () => {
        if (project) {
            handleDelete();
            setTimeout(() => setIsModalOpen(false), 500);
        }
    };

    const handleDelete = async () => {
        let a = await triggerDelete(currentProjId!)
        dispatch(ProjectSliceActions.setCurrentProjectId(null))
        console.log(a)
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F66450'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        }
                    }
                }}
            >
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className={cls.modalView} footer={[]}>
                    <div className={cls.blockData}>
                        <span className={cls.date}>
                            Вы уверены, что хотите удалить?
                        </span>

                        <div className={cls.btns}>
                            <Button type="primary" className={cls.btnDelete} size={'large'} onClick={deleteCheck}>
                                Удалить
                            </Button>

                            <Button type="primary" className={cls.btnCancel} size={'large'} onClick={handleCancel}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
};
