import cls from "./DeleteCheckModal.module.scss";
import {useState} from 'react';
import React from 'react';
import {ConfigProvider, Modal, Button} from 'antd';

export const DeleteCheckModal = ({ open }: any): React.JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(open || false);

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
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className={cls.modalView} footer={[]}>
                    <div className={cls.blockData}>
                        <span className={cls.date}>
                            Вы уверены, что хотите удалить
                            запланированную проверку? Если задача
                            повторяющаяся, то все повторы
                            будут удалены.
                        </span>

                        <div className={cls.btns}>
                            <Button type="primary" className={cls.btnDelete} size={'large'} onClick={deleteCheck}>
                                УДАЛИТЬ
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
