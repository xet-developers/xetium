import cls from "./CreateReport.module.scss";
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Select, DatePicker, ConfigProvider } from "antd";
import { FileSyncOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

export const CreateReport = () => {

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
                <span className={cls.header}>Создание отчёта</span>

                <div>
                    <span className={cls.textUp}>Выберите интервал</span>
                    <RangePicker/>
                </div>

                <div className={cls.footer}>
                    <div>
                        <span className={cls.textUp}>Выберите шаблон отчёта</span>
                        <Select
                            value="1"
                            style={{width: 450, fontFamily: "Montserrat"}}
                            options={[
                                {value: '1', label: 'Динамика позиций сайта за интервал времени'},
                                {value: '2', label: 'Новые форматы отчётов в разработке'},
                            ]}
                        />
                    </div>

                    <div>
                        <span className={cls.textUp}>Выберите кластер</span>
                        <Select
                            defaultValue="1"
                            style={{width: 200, fontFamily: "Montserrat"}}
                            options={[
                                {value: '1', label: 'Без кластера'},
                                {value: '2', label: 'Кластер 1'},
                                {value: '3', label: 'Кластер 2'},
                                {value: '4', label: 'Кластер 3'},
                            ]}
                        />
                    </div>

                    <Button className={cls.btn} onClick={handleGenerate}><FileSyncOutlined/>СГЕНЕРИРОВАТЬ ОТЧЕТ</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


