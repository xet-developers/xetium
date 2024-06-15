import {FC, useCallback, useState} from 'react';
import React from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {createProjectActions, createProjectReducer} from "../model/slice/createProject.slice.ts";
import cls from "@/features/CreateProject/styles/CreateProject.module.scss";
import {Button, ConfigProvider, Modal, Input} from 'antd';
import {useSelector} from "react-redux";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader.tsx";
import {
    getProjectLabel,
    getProjectName,
    getProjectUrl
} from "@/features/CreateProject/model/selectors/createProject.selectors.ts";
import {usePostCreateProjectMutation} from "../api/createProject.api.ts";
import { ProjectValidator} from "@/shared/lib/validator/project/project.ts";
import {useGetProjectQuery} from "@/entity/Project";

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
    const {data, } = useGetProjectQuery();

    const projectName = useSelector(getProjectName);
    const projectUrl = useSelector(getProjectUrl);
    const projectDesc = useSelector(getProjectLabel);

    const [validateNameProject, setValidateNameProject] = useState(false);
    const [validateUrlProject, setValidateUrlProject] = useState(false);
    const [validateDescProject, setValidateDescProject] = useState(false);

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
        if (validate()) {
            console.log({
                url: projectUrl,
                name: projectName,
                description: projectDesc,
            })

            await trigger({
                url: projectUrl,
                name: projectName,
                description: projectDesc,
            })
            console.log('dsdsa')
            if (result) {
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
        setValidateNameProject(false);
        setValidateUrlProject(false);
        setValidateDescProject(false);
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
                            defaultActiveBg: '#ba4c3b',
                            defaultHoverColor: '#fff'
                        }
                    }
                }}
            >
                <Modal
                    open={open}
                    className={cls.modal}
                    footer={null}
                    closeIcon={null}
                >
                    <div className={cls.data}>
                        <span className={cls.header}>Создание проекта</span>

                        <Input value={projectName} onChange={onChangeProjectName} className={cls.inputName}
                               placeholder={'Название'}/>

                        {
                            validateNameProject &&
                            <p style={{fontSize:'12px', width: '500px', color:'rgb(246, 100, 80)'}}>
                                Название проекта должно начинаться с буквы и иметь длину от 1-30 символов!
                            </p>
                        }

                        <Input value={projectUrl} onChange={onChangeProjectUrl} className={cls.inputLink}
                               placeholder={'Ссылка на сайт: HTTPS://EXAMPLE.COM/*'}/>

                        {
                            validateUrlProject &&
                            <p style={{fontSize:'12px', color:'rgb(246, 100, 80)'}}>
                                Некорректные данные. Введите ссылку по примеру: HTTPS://EXAMPLE.COM/
                            </p>
                        }

                        <TextArea value={projectDesc} rows={5} onChange={onChangeProjectLabel} className={cls.inputDesc}
                                  placeholder={'Описание'} autoSize={{
                            minRows: 3,
                            maxRows: 5
                        }}/>

                        {
                            validateDescProject &&
                            <p style={{fontSize:'12px', color:'rgb(246, 100, 80)'}}>
                                Описание проекта должно содержать только буквы, цифры и иметь длину не более 150 символов!
                            </p>
                        }

                        <div style={{display: 'flex', flexDirection: 'row', gap: '2em'}}>
                            <Button type="primary" onClick={handleOk} className={cls.btnCreate}>
                                Создать проект
                            </Button>

                            {data &&
                                <Button type="primary" onClick={handleCancel} className={cls.btnCancel}>
                                    Отмена
                                </Button>
                            }
                        </div>
                    </div>

                    {isLoading&&<div>Loading</div>}
                </Modal>
            </ConfigProvider>
        </DynamicModuleLoader>
    );

    function validate() {
        let name = ProjectValidator.validateNameProject(projectName);
        let url = ProjectValidator.validateUrlProject(projectUrl);
        let desc = ProjectValidator.validateDescProject(projectDesc.length);

        setValidateNameProject(!name);
        setValidateUrlProject(!url);
        setValidateDescProject(!desc);

        return name && url && desc;
    }
};




