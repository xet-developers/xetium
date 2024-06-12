import cls from "./ProjectInformation.module.scss";
import {Button, Input, ConfigProvider} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {
    currentProjectId,
    ProjectSliceActions,
    useDeleteProjectMutation,
    useGetProjectQuery,
    useUpdateProjectMutation
} from "@/entity/Project";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";

const {TextArea} = Input;


export const ProjectInformation = () => {
    const {data: projects} = useGetProjectQuery()
    const [triggerUpdate] = useUpdateProjectMutation()
    const [triggerDelete] = useDeleteProjectMutation()
    const currentProjId = useSelector(currentProjectId)
    const [name, setName] = useState('')
    const [disk, setDisk] = useState('')
    const [url, setUrl] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (projects) {
            const proj = projects.find(el => el.id === currentProjId)
            if (!proj) {
                return
            }

            setName(proj.name)
            setDisk(proj.description)
            setUrl(proj.url)
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

    const handleDelete = async () => {
        let a = await triggerDelete(currentProjId!)
        dispatch(ProjectSliceActions.setCurrentProjectId(null))
        console.log(a)
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
                <Input disabled={!isEditing} className={cls.inputUrl}
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
                    <Button onClick={handleDelete} className={cls.btn}><DeleteOutlined/>Удалить проект</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


