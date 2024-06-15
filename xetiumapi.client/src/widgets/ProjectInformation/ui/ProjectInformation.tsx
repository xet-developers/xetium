import cls from "./ProjectInformation.module.scss";
import {Button, Input, ConfigProvider} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {
    currentProjectId, useDeleteProjectMutation,
    useGetProjectQuery,
    useUpdateProjectMutation
} from "@/entity/Project";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CreateProject} from "@/features/CreateProject";
import {DeleteModal} from "@/shared/ui/components/DeleteModal";

const {TextArea} = Input;

export const ProjectInformation = () => {
    const {data: projects} = useGetProjectQuery()
    const [triggerUpdate] = useUpdateProjectMutation()
    const [trigger] = useDeleteProjectMutation()

    const currentProjId: string = useSelector(currentProjectId)
    const [name, setName] = useState('')
    const [disk, setDisk] = useState('')
    const [url, setUrl] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const [open, setOpen] = useState(false);
    const [createProject, setCreateProject] = useState(false);

    useEffect(() => {
        if (projects) {
            const proj = projects.find(el => el.id === currentProjId)
            if (!proj) {
                return
            }

            setName(proj.name)
            setDisk(proj.description)
            setUrl(proj.url)
            setCreateProject(false);
        } else {
            setCreateProject(true);
        }

    }, [currentProjId, projects]);

    const handleUpdate = async () => {
        if (projects) {
            const proj = projects.find(el => el.id === currentProjId)
            if (!proj) {
                return
            }
            if (isEditing) {
                await triggerUpdate({...proj, url: url, name: name, description: disk})
            }
        }

        setIsEditing(!isEditing)
    }

    const deleteProject = () => {
        trigger(currentProjId);
        setOpen(false);
    }

    return (

        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450',
                    colorText: '#252525'
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
            <div className={cls.container}>
                <span className={cls.header}>Основная информация</span>

                <Input disabled={!isEditing} className={cls.inputName} value={!name ? 'Название проекта' : name}
                       onChange={(e) => setName(e.target.value)}
                />

                <Input disabled className={cls.inputUrl}
                       value={!url ? 'https://www.figma.com/file/Текущие' : url}
                       onChange={(e) => setUrl(e.target.value)}
                />

                <div className={cls.keyWords}>
                    <TextArea disabled={!isEditing} autoSize={{minRows: 6, maxRows: 6}}
                              placeholder={'Введите ключевые слова, на которые необходимо опираться при генерации запросов'}
                              style={{
                                  marginTop: "-1em", width: "720px", fontFamily: "Montserrat", border: 'none',
                                  fontSize: '15px', fontWeight: '500', letterSpacing: '0.7px', color: '#5F5F5F'
                              }}
                              className={cls.disabled}
                              value={!disk ? 'Figma — онлайн-редактор, в котором удобно проектировать интерфейсы, ' +
                                  'создавать макеты сайтов, мобильных приложений, презентации, иллюстрации, ' +
                                  'логотипы и анимацию. В основном инструментом пользуются дизайнеры, но ' +
                                  'продакт-менеджерам и разработчикам тоже полезно разбираться в программе. ' +
                                  'Так участникам проекта будет проще понимать друг друга и работать над ' +
                                  'продуктом.' : disk}
                              onChange={(e) => setDisk(e.target.value)}
                    >
                    </TextArea>
                </div>

                <div className={cls.btns}>
                    <Button onClick={handleUpdate}
                            className={isEditing ? cls.btnEdit : cls.btn}><EditOutlined/>{isEditing ? 'Сохранить' : 'Редактировать'}
                    </Button>
                    <Button onClick={() => setOpen(true)} className={cls.btn} ><DeleteOutlined/>Удалить проект</Button>
                </div>

                <DeleteModal open={open} setOpen={setOpen} functionDelete={deleteProject}/>
            </div>
        </ConfigProvider>
    );
};


