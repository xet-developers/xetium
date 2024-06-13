import cls from "./DeleteCheckModal.module.scss";
import {useState} from 'react';
import React from 'react';
import {ConfigProvider, Modal, Button} from 'antd';
import { useDeleteCheckModalMutation } from "./api/deleteCheckModal.api";

export const DeleteModal = ({ open, jobId, taskId }: any): React.JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(open || false);
    const [trigger] = useDeleteCheckModalMutation()
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteCheck = async () => {
        await trigger({
            jobId: jobId,
            taskId: taskId
        })
    };

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