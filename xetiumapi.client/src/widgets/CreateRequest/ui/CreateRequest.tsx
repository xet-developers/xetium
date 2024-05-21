import cls from "./CreateRequest.module.scss";
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Select, Radio, ConfigProvider } from "antd";

export const CreateRequest = () => {

    const { TextArea } = Input;

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
            <div className={cls.container}>
                <span className={cls.header}>Создание запроса</span>

                <div className={cls.radios}>
                    <Radio.Group onChange={onChange} value={valueRadio}>
                        <Radio value={1}>Выборочная генерация</Radio>
                        <Radio value={2}>Полная генерация</Radio>
                    </Radio.Group>
                </div>

                <div className={cls.keyWords}>
                    <span className={cls.textUp}>Ключевые слова</span>
                    <TextArea autoSize={{minRows: 4, maxRows: 4}}
                              placeholder={'Введите ключевые слова, на которые необходимо опираться при генерации запросов'}></TextArea>
                </div>

                <div className={cls.footer}>
                    <div>
                        <span className={cls.textUp}>Количество генерируемых слов</span>
                        <Select
                            defaultValue="10"
                            style={{ width: 70 }}
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
                            style={{ width: 170 }}
                            options={[
                                { value: '5', label: 'Навигационный' },
                                { value: '10', label: 'Транзакционный' },
                                { value: '15', label: 'Информационный' },
                                { value: '20', label: 'Сравнительный' },
                            ]}
                        />
                    </div>

                    <Button className={cls.btn} onClick={handleGenerate}>СГЕНЕРИРОВАТЬ</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


