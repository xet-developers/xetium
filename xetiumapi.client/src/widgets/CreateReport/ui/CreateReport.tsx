import cls from "./CreateReport.module.scss";
import { Button, Select, DatePicker, ConfigProvider } from "antd";
import { FileSyncOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { RangePicker } = DatePicker;

export const CreateReport = () => {

    const [dateRange, setDateRange] = useState(null);
    const [validateDateRange, validateSetDateRange] = useState(false);

    const [error, setError] = useState('');

    const handleGenerate = () => {
        if (!dateRange) {
            validateSetDateRange(true);
            setError('error');
            return;
        }
        setDateRange(null);
        validateSetDateRange(false);
        setError('');
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

                <div className={cls.block}>
                    <span className={cls.textUp}>Выберите интервал</span>
                    <RangePicker
                        className={cls.date}
                        onChange={(dates) => setDateRange(dates)}
                        value={dateRange}
                        status={error}
                    />
                </div>

                {!dateRange && validateDateRange &&
                    <span style={{fontSize:'12px', marginLeft: '2em', marginTop: '0.5em', marginBottom: '-1em', color:'rgb(246, 100, 80)'}}>
                        Выберите начало и конец интервала!
                    </span>}

                <div className={cls.block} style={{marginTop: '15px'}}>
                    <span className={cls.textUp}>Выберите шаблон отчёта</span>
                    <Select
                        value="1"
                        style={{width: 400, fontFamily: "Montserrat", marginTop: '-5px'}}
                        options={[
                            {value: '1', label: 'Динамика позиций сайта за интервал времени'},
                            {value: '2', label: 'Новые форматы отчётов в разработке'},
                        ]}
                    />
                </div>

                <div className={cls.block} style={{marginTop: '15px'}}>
                    <span className={cls.textUp}>Выберите кластер</span>
                    <Select
                        defaultValue="1"
                        style={{width: 200, fontFamily: "Montserrat", marginTop: '-5px'}}
                        options={[
                            {value: '1', label: 'Все кластеры'},
                            {value: '2', label: 'Кластер 1'},
                            {value: '3', label: 'Кластер 2'},
                            {value: '4', label: 'Кластер 3'},
                        ]}
                    />
                </div>

                <Button className={cls.btn} onClick={handleGenerate}><FileSyncOutlined/>Сгенерировать</Button>
            </div>
        </ConfigProvider>
    );
};


