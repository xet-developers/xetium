import cls from "./ViewCheckModal.module.scss";
import { useState } from 'react';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal, Button } from 'antd';
import {DeleteModal} from "@/features/DeleteCheckModal/DeleteModal.tsx";
import dayjs from "dayjs";

export const ViewCheckModal = ({ open, setOpen, task }: any): React.JSX.Element => {

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const showModal = () => {
        setIsModalDeleteOpen(true);
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#C0CCF7'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        }
                    }
                }}
            >
                <Modal
                    open={open}
                    onOk={()=>setOpen(false)}
                    onCancel={()=>setOpen(false)}
                    className={cls.modalView}
                    footer={[

                    ]}>
                    <div className={cls.blockData}>
                        <span className={cls.date}>
                            {task && dayjs(task.ScheduleTime).format('DD.MM.YYYY')} в {task && dayjs(task.ScheduleTime).add(7,'hours').format('HH:mm')}
                        </span>

                            <span className={cls.name}>
                            Проверка: {task && task.Id}
                        </span>

                        <Button type="text" className={cls.btnDelete} onClick={showModal}>
                            <DeleteOutlined style={{color: '#454545'}}/>
                            Удалить
                        </Button>
                    </div>

                </Modal>
            </ConfigProvider>
            <div>
                {isModalDeleteOpen && <DeleteModal jobId={task?.JobId} taskId={task?.Id} open={isModalDeleteOpen}/>}
            </div>
        </>
    );
};
