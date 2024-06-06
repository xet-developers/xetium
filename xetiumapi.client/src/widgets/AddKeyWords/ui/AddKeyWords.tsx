import cls from "./AddKeyWords.module.scss";
import { Button, Input, Checkbox, GetProp, ConfigProvider } from "antd";
import { FileSyncOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const AddKeyWords = () => {

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const options = [
        { label: 'Yandex', value: 'Yandex' },
        { label: 'Google', value: 'Google' },
    ];

    const handleGenerate = () => {

    }

    const saveCluster = () => {

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
                <span className={cls.header}>Добавление ключевых слов</span>

                <div className={cls.block}>
                    <span className={cls.textUp} style={{marginTop: "-2em"}}>Выберите поисковую систему:</span>
                    <Checkbox.Group options={options} defaultValue={['Google']} onChange={onChange}
                                    className={cls.textUp} style={{marginTop: "8px"}}/>
                </div>


                <div className={cls.block}>
                    <span className={cls.textUp}>Ключевые слова</span>
                    <TextArea autoSize={{minRows: 4, maxRows: 4}}
                              placeholder={'Введите ключевые слова, например: новости, википедия...'}
                              style={{marginTop: "8px", width: "720px", fontFamily: "Montserrat"}}>
                    </TextArea>
                    <span className={cls.textFooter}>Введите запросы - каждый запрос через запятую. Поиск осуществляется в топ-100.</span>
                </div>


                <div className={cls.footer}>
                    <Button className={cls.btn} onClick={saveCluster}><FileSyncOutlined/>Сохранить как кластер</Button>
                    <Button className={cls.btn} onClick={handleGenerate}><FileSyncOutlined/>Отправить слова</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


