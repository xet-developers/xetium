import cls from "./ViewCheckModal.module.scss";
import { useState } from 'react';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal, Button } from 'antd';
import {DeleteCheckModal} from "@/features/DeleteCheckModal/DeleteCheckModal.tsx";

export const ViewCheckModal = ({ date, time }):React.JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalDeleteOpen(true);
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
                            {date.format('DD.MM.YYYY')} в {time}
                        </span>

                        <span className={cls.name}>
                            Проверка 1
                        </span>

                        <Button type="text" className={cls.btnDelete} onClick={showModal}>
                            <DeleteOutlined style={{color: '#454545'}}/>
                            Удалить
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
            <div>
                {isModalDeleteOpen && <DeleteCheckModal open={isModalDeleteOpen}/>}
            </div>
        </>
    );
};
