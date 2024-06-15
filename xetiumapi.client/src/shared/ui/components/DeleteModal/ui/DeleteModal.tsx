import {FC} from 'react';
import cls from "@/features/DeleteCheckModal/DeleteCheckModal.module.scss";
import {Button, ConfigProvider, Modal } from 'antd';

export interface IDeleteModalProps {
    functionDelete: () => void;
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const DeleteModal: FC<IDeleteModalProps> = (props) => {
    const { functionDelete, open, setOpen} : IDeleteModalProps = props;

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
                <Modal open={open} onOk={ () => setOpen(false) } onCancel={() => setOpen(false)} className={cls.modalView} footer={[]}>
                    <div className={cls.blockData}>
                        <span className={cls.date}>
                            Вы уверены, что хотите удалить?
                        </span>

                        <div className={cls.btns}>
                            <Button type="primary" className={cls.btnDelete} size={'large'} onClick={functionDelete}>
                                Удалить
                            </Button>

                            <Button type="primary" className={cls.btnCancel} size={'large'} onClick={() => setOpen(false)}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
};