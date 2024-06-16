import cls from "./ViewCheckModal.module.scss";
import { useState } from 'react';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal, Button } from 'antd';
import {DeleteCheckModal} from "../DeleteCheckModal";
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
                    footer={null}
                    width={'400px'}
                    style={{top: '40%'}}
                >
                    <div className={cls.blockData} >
                        <span className={cls.date}>
                            {task && dayjs(task.ScheduleTime).format('DD.MM.YYYY')}
                        </span>

                            <span className={cls.name}>
                            Проверка состоится в {task && dayjs(task.ScheduleTime).add(7,'hours').format('HH:mm')}
                        </span>

                        <Button type="text" className={cls.btnDelete} onClick={showModal}>
                            <DeleteOutlined style={{color: '#454545'}}/>
                            Удалить
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
            <div>
                {isModalDeleteOpen && <DeleteCheckModal jobId={task?.JobId} taskId={task?.Id} open={isModalDeleteOpen} setOpen={setIsModalDeleteOpen}/>}
            </div>
        </>
    );
};
