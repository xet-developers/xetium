import cls from "./ResultGeneration.module.scss";
import  { useState } from 'react';
import { Button, ConfigProvider, Table, TableProps  } from "antd";
import { DownloadOutlined } from '@ant-design/icons';


export const ResultGeneration = () => {

    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    interface DataType {
        key: string;
        navigate: string;
        info: string;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Навигационный',
            dataIndex: 'navigate',
            key: 'navigate',
        },
        {
            title: 'Информационный',
            dataIndex: 'info',
            key: 'info',
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
        {
            key: '1',
            navigate: 'Какой магазин предлагает утюги с техническими характеристиками?',
            info: 'Какой магазин предлагает утюги с техническими характеристиками?'
        },
    ];


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450',
                    colorText: '#252525',
                    fontFamily: 'Montserrat',
                    lineHeight: 0.8
                },
                components: {
                    Button: {
                        textHoverBg: '#ba4c3b',
                        defaultActiveBg: '#ba4c3b'
                    },
                    Table: {
                        headerColor: '#252525',
                    }
                }
            }}
        >
            <div className={cls.container}>
                <div className={cls.header}>
                    <span>Результаты</span>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined/>}
                        loading={loadings[1]}
                        onClick={() => enterLoading(1)}
                        className={cls.btn}
                    >
                        Скачать в формате Excel
                    </Button>
                </div>

                <Table className={cls.blockData} columns={columns} dataSource={data} />
            </div>
        </ConfigProvider>
    );
};


