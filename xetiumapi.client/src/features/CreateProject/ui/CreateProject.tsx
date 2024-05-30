import {FC, useCallback} from 'react';
import React from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {createProjectActions, createProjectReducer} from "../model/slice/createProject.slice.ts";
import cls from "@/features/CreateProject/styles/CreateProject.module.scss";
import {Button, ConfigProvider, Modal, Input, message} from 'antd';
import {useSelector} from "react-redux";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader.tsx";
import {
    getProjectLabel,
    getProjectName,
    getProjectUrl
} from "@/features/CreateProject/model/selectors/createProject.selectors.ts";
import {usePostCreateProjectMutation} from "../api/createProject.api.ts";

const reducers: ReducersList = {
    createProject: createProjectReducer,
};

export interface ICreateProjectProps {
    open: boolean,
    setOpen: (value: boolean) => void
}

const {TextArea} = Input;

export const CreateProject: FC<ICreateProjectProps> = (props): React.JSX.Element => {
    const {open, setOpen}: ICreateProjectProps = props
    const [trigger, {data: result, isLoading}] = usePostCreateProjectMutation();
    const dispatch = useAppDispatch();

    const projectName = useSelector(getProjectName)
    const projectUrl = useSelector(getProjectUrl)
    const projectDesc = useSelector(getProjectLabel)

    const onChangeProjectName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createProjectActions.setProjectName(event.target.value));
    }, [dispatch]);

    const onChangeProjectUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createProjectActions.setProjectUrl(event.target.value));
    }, [dispatch]);

    const onChangeProjectLabel = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(createProjectActions.setProjectLabel(event.target.value));
    }, [dispatch]);

    const handleOk = async () => {
        if (!projectName || !projectUrl || !projectDesc) {
            message.info('Заполните все поля');
        } else {
            await trigger({
                url: projectUrl,
                name: projectName,
                description: projectDesc,
            })
            console.log('dsdsa')
            if(result){
                clear()
                setOpen(false);
            }
        }
    };

    const clear = useCallback(() => {
        dispatch(createProjectActions.setProjectUrl(''));
        dispatch(createProjectActions.setProjectName(''));
        dispatch(createProjectActions.setProjectLabel(''));
    }, [])

    const handleCancel = () => {
        clear()
        setOpen(false);
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
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

                        <Input value={projectName} onChange={onChangeProjectName} className={cls.inputName}
                               placeholder={'Название'}/>

                        <Input value={projectUrl} onChange={onChangeProjectUrl} className={cls.inputLink}
                               placeholder={'Ссылка на сайт: HTTPS://EXAMPLE.COM/*'}/>

                        <TextArea value={projectDesc} rows={5} onChange={onChangeProjectLabel} className={cls.inputDesc}
                                  placeholder={'Описание'} autoSize={{
                            minRows: 3,
                            maxRows: 5
                        }}/>

                        <Button type="text" onClick={handleOk} className={cls.btnCreate}>
                            СОЗДАТЬ ПРОЕКТ
                        </Button>

                        <Button type="text" onClick={handleCancel} className={cls.btnCancel}>
                            ОТМЕНА
                        </Button>
                    </div>

                    {isLoading&&<div>Loading</div>}
                </Modal>
            </ConfigProvider>
        </DynamicModuleLoader>
    );
};


