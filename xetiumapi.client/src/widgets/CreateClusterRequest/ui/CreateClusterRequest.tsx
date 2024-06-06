import cls from "./CreateClusterRequest.module.scss";
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Select, Radio, ConfigProvider } from "antd";
import { FileSyncOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const CreateClusterRequest = () => {

    const [valueRadio, setValueRadio] = useState();

    const onChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);
    };

    const handleGenerate = () => {

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
                <span className={cls.header}>Создание запроса</span>

                <Radio.Group onChange={onChange} value={valueRadio}>
                    <Radio value={1} className={cls.radio}>Выборочная генерация</Radio>
                    <Radio value={2} className={cls.radio}>Полная генерация</Radio>
                </Radio.Group>

                <div className={cls.keyWords}>
                    <span className={cls.textUp}>Ключевые слова</span>
                    <TextArea autoSize={{minRows: 4, maxRows: 4}}
                              placeholder={'Введите ключевые слова, на которые необходимо опираться при генерации запросов'} style={{marginTop: "8px", width: "720px", fontFamily: "Montserrat" }}>
                    </TextArea>
                </div>

                <div className={cls.footer}>
                    <div>
                        <span className={cls.textUp}>Количество генерируемых слов</span>
                        <Select
                            defaultValue="10"
                            style={{ width: 70, fontFamily: "Montserrat" }}
                            options={[
                                { value: '5', label: '5' },
                                { value: '10', label: '10' },
                                { value: '15', label: '15' },
                                { value: '20', label: '20' },
                            ]}
                        />
                    </div>

                    <div>
                        <span className={cls.textUp}>Интент пользователя</span>
                        <Select
                            defaultValue="10"
                            style={{ width: 200, fontFamily: "Montserrat" }}
                            options={[
                                { value: '5', label: 'Навигационный' },
                                { value: '10', label: 'Транзакционный' },
                                { value: '15', label: 'Информационный' },
                                { value: '20', label: 'Сравнительный' },
                            ]}
                        />
                    </div>

                    <Button className={cls.btn} onClick={handleGenerate}><FileSyncOutlined/>СГЕНЕРИРОВАТЬ</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


