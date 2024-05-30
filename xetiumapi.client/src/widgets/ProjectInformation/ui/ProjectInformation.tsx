import cls from "./ProjectInformation.module.scss";
import { Button, Input, ConfigProvider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const ProjectInformation = () => {

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

                <Input className={cls.inputName} value={'Название проекта'}/>
                <Input className={cls.inputUrl} value={'https://www.figma.com/file/Текущие'}/>

                <div className={cls.keyWords}>
                    <TextArea autoSize={{minRows: 6, maxRows: 6}}
                              placeholder={'Введите ключевые слова, на которые необходимо опираться при генерации запросов'}
                              style={{marginTop: "-1em", width: "720px", fontFamily: "Montserrat", border: 'none',
                                  fontSize: '15px', fontWeight: '500', letterSpacing: '0.7px', color: '#5F5F5F'}}
                              value={'Figma — онлайн-редактор, в котором удобно проектировать интерфейсы, ' +
                                  'создавать макеты сайтов, мобильных приложений, презентации, иллюстрации, ' +
                                  'логотипы и анимацию. В основном инструментом пользуются дизайнеры, но ' +
                                  'продакт-менеджерам и разработчикам тоже полезно разбираться в программе. ' +
                                  'Так участникам проекта будет проще понимать друг друга и работать над ' +
                                  'продуктом.'}>
                    </TextArea>
                </div>

                <div className={cls.btns}>
                    <Button className={cls.btn}><EditOutlined/>Редактировать</Button>
                    <Button className={cls.btn}><DeleteOutlined/>Удалить проект</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


