import { useCallback, useState } from 'react';
import React from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {createProjectActions} from "@/features/CreateProject/model/slice/createProject.slice.ts";
import cls from "@/features/CreateProject/ui/CreateProject.module.scss";
import {Button, ConfigProvider, Modal, Input, message } from 'antd';
import { useCreateProjectApi} from "@/features/Header/api/createProject.api.ts";

export const CreateProject = ({ open, setOpen }: any): React.JSX.Element => {
    //const props: ICreateProjectProps = {}
    const { TextArea } = Input;

    const [trigger, result] = useCreateProjectApi();
    const dispatch = useAppDispatch();
    const [projectName, setProjectName] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [projectDesc, setProjectDesc] = useState('');

    const onChangeProjectName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
        dispatch(createProjectActions.setProjectName(event.target.value));
    }, [dispatch]);

    const onChangeProjectUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectUrl(event.target.value);
        dispatch(createProjectActions.setProjectUrl(event.target.value));
    }, [dispatch]);

    const onChangeProjectLabel = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProjectDesc(event.target.value);
        dispatch(createProjectActions.setProjectLabel(event.target.value));
    }, [dispatch]);

    const handleOk = () => {
        if (!projectName ||!projectUrl ||!projectDesc) {
            message.info('Заполните все поля');
        }
        else { setOpen(false); }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F66450',
                        colorText: '#FFF'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        },
                        Button: {
                            textHoverBg: '#ba4c3b',
                            defaultActiveBg: '#ba4c3b'
                        }
                    }
                }}
            >
                <Modal
                    open={open}
                    className={cls.modal}
                    footer={null}
                    width={'567px'}
                    closeIcon={null}
                >
                    <div className={cls.data}>
                        <span className={cls.header}>Создание проекта</span>

                        <Input value={projectName} onChange={onChangeProjectName} className={cls.inputName} placeholder={'Название'}/>

                        <Input value={projectUrl} onChange={onChangeProjectUrl} className={cls.inputLink} placeholder={'Ссылка на сайт: HTTPS://EXAMPLE.COM/*'}/>

                        <TextArea value={projectDesc} rows={5} onChange={onChangeProjectLabel} className={cls.inputDesc} placeholder={'Описание'} autoSize={{
                            minRows:3,
                            maxRows: 5
                        }}/>

                        <Button type="text" onClick={handleOk} className={cls.btnCreate}>
                            СОЗДАТЬ ПРОЕКТ
                        </Button>

                        <Button type="text" onClick={handleCancel} className={cls.btnCancel}>
                            ОТМЕНА
                        </Button>
                    </div>

                </Modal>
            </ConfigProvider>
        </>
    );
};


