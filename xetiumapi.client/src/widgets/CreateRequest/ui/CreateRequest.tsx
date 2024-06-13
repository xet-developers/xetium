import cls from "./CreateRequest.module.scss";
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Select, Radio, ConfigProvider } from "antd";
import { FileSyncOutlined } from '@ant-design/icons';
import {CheckPositionValidator} from "@/shared/lib/validator/checkPosition/checkPosition.ts";

const { TextArea } = Input;

export const CreateRequest = () => {

    const [valueRadio, setValueRadio] = useState(1);
    const [defaultValueCount, setDefaultValueCount] = useState('10');
    const [defaultValue, setDefaultValue] = useState('1');
    const [inputValue, setInputValue] = useState('');
    const [validateInputValue, setValidateInputValue] = useState(false);

    function validate() {
        let inv = CheckPositionValidator.validateInputValue(inputValue);
        setValidateInputValue(!inv);

        return inv;
    }

    const handleGenerate = () => {
        if (validate()) {
            console.log('ok')
        }
    }

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const onChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);

        if (e.target.value === 2) {
            setDefaultValueCount('20');
            setDefaultValue('5');
        } else {
            setDefaultValueCount('5');
            setDefaultValue('1');
        }
    };

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
                              placeholder={'Введите ключевые слова, на которые необходимо опираться при генерации запросов'}
                              style={{marginTop: "8px", width: "740px", fontFamily: "Montserrat" }}
                              value={inputValue}
                              onChange={onInputChange}
                    >
                    </TextArea>

                    {
                        validateInputValue &&
                        <span style={{fontSize:'13px', marginBottom:'-5px', color:'rgb(246, 100, 80)'}}>
                            Количество ключевых слов должно быть в диапазоне от 1 до 15!
                        </span>
                    }
                </div>

                <div className={cls.footer}>
                    <div>
                        <span className={cls.textUp}>Количество генерируемых слов</span>
                        <Select
                            key={defaultValueCount}
                            defaultValue={defaultValueCount}
                            style={{ width: 70, fontFamily: "Montserrat" }}
                            options={[
                                ...(valueRadio === 1? [{ value: '5', label: '5' }] : []),
                                ...(valueRadio === 1? [{ value: '10', label: '10' }] : []),
                                ...(valueRadio === 1? [{ value: '15', label: '15' }] : []),
                                { value: '20', label: '20' },
                            ]}
                        />
                    </div>

                    <div>
                        <span className={cls.textUp}>Интент пользователя</span>
                        <Select
                            key={defaultValue}
                            defaultValue={defaultValue}
                            style={{ width: 200, fontFamily: "Montserrat" }}
                            options={[
                                ...(valueRadio === 1? [{ value: '1', label: 'Навигационный' }] : []),
                                ...(valueRadio === 1? [{ value: '2', label: 'Транзакционный' }] : []),
                                ...(valueRadio === 1? [{ value: '3', label: 'Информационный' }] : []),
                                ...(valueRadio === 1? [{ value: '4', label: 'Сравнительный' }] : []),
                                ...(valueRadio === 2? [{ value: '5', label: 'Все интенты' }] : []),
                            ]}
                        />
                    </div>

                    <Button className={cls.btn} onClick={handleGenerate}><FileSyncOutlined/>Сгенерировать</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


