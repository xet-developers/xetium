import cls from "./DeleteCheckModal.module.scss";
import {useState} from 'react';
import React from 'react';
import {ConfigProvider, Modal, Button} from 'antd';

interface DeleteCheckModalProps {
    open?: any
}

export const DeleteCheckModal = ({isModal}: DeleteCheckModalProps): React.JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteCheck = () => {

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
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className={cls.modalView}>
                    <div className={cls.blockData}>
                        <span className={cls.date}>
                            Вы уверены, что хотите удалить
                            запланированную проверку? Если задача
                            повторяющаяся, то все повторы
                            будут удалены.
                        </span>

                        <Button type="primary" className={cls.btnDelete} onClick={deleteCheck}>
                            УДАЛИТЬ
                        </Button>

                        <Button type="primary" className={cls.btnDelete} onClick={deleteCheck}>
                            Отмена
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
};
