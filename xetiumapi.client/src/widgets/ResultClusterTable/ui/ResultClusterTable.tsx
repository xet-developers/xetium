import cls from "./ResultClusterTable.module.scss";
import  { useState, useEffect } from 'react';
import { ConfigProvider, Table, TableColumnsType, Skeleton } from "antd";


export const ResultClusterTable = () => {

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [generation, setGeneration] = useState(true);

    interface DataType {
        key: React.Key;
        date: string;
        count: number;
        countGood: number;
        link: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'name',
            width: 100,
            fixed: 'left',
            onFilter: (value, record) => record.date.indexOf(value as string) === 0,
        },
        /*{
            title: 'Количество запросов',
            dataIndex: 'count',
            key: 'name',
            width: 250,
            fixed: 'left',
        },
        {
            title: 'Количество кластеризованных запросов',
            dataIndex: 'countGood',
            key: 'name',
            width: 250,
            fixed: 'left',
        },*/
        {
            title: 'Ссылка для скачивания',
            dataIndex: 'link',
            key: 'name',
            width: 250,
            fixed: 'left',
            render: (text: string) => <a href={text} download className={cls.link}>Скачать</a>,
        },

    ];

    const data: DataType[] = [];
    for (let i = 0; i < 1; i++) {
        data.push({
            key: i,
            date: '13.06.2024',
            count: 10,
            countGood: 7,
            link: 'https://post-images.org/photo-page.php?photo=8YPKfLzi'
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


