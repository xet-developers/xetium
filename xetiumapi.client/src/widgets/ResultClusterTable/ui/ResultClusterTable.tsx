import cls from "./ResultClusterTable.module.scss";
import  { useState, useEffect } from 'react';
import { ConfigProvider, Table, TableColumnsType, Skeleton } from "antd";


export const ResultClusterTable = () => {

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [generation, setGeneration] = useState(true);

    interface DataType {
        key: React.Key;
        name: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Дата',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            fixed: 'left',
            onFilter: (value, record) => record.name.indexOf(value as string) === 0,
        },
        {
            title: 'Количество запросов',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            fixed: 'left',
            onFilter: (value, record) => record.name.indexOf(value as string) === 0,
        },
        {
            title: 'Количество кластеризованных запросов',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            fixed: 'left',
            onFilter: (value, record) => record.name.indexOf(value as string) === 0,
        },
        {
            title: 'Ссылка для скачивания',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            fixed: 'left',
            onFilter: (value, record) => record.name.indexOf(value as string) === 0,
        },

    ];

    const data: DataType[] = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: 'википедия екатерина 1 '
        });
    }

    useEffect(() => {
        setTimeout(() => {
            setGeneration(false);
        }, 3000);
    }, []);

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
                    <span>Результаты кластеризации</span>
                </div>

                <div className="blockData">
                    {generation ? (
                        <Skeleton active className={cls.skeleton}/>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            size="middle"
                            scroll={{ x: 'calc(700px + 50%)', y: 280 }}
                            className={cls.table}
                        />
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
};

