import cls from "./ResultClusterTable.module.scss";
import  { useState, useEffect } from 'react';
import { ConfigProvider, Table, TableColumnsType, Skeleton } from "antd";


export const ResultClusterTable = () => {

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [generation, setGeneration] = useState(true);

    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        street: string;
        building: string;
        number: number;
        companyAddress: string;
        companyName: string;
        gender: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Ключевые фразы',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            fixed: 'left',
            onFilter: (value, record) => record.name.indexOf(value as string) === 0,
        },
        {
            title: 'Дата и время',
            children: [
                {
                    title: '30.05.24 в 06:00',
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: 'building',
                            key: 'building',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: 'number',
                            key: 'number',
                            width: 100,
                        },
                    ],

                },
                {
                    title: '30.05.24',
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: 'building',
                            key: 'building',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: 'number',
                            key: 'number',
                            width: 100,
                        },
                    ],
                },
                {
                    title: '30.05.24',
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: 'building',
                            key: 'building',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: 'number',
                            key: 'number',
                            width: 100,
                        },
                    ],
                },
                {
                    title: '30.05.24 в 17:00',
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: 'building',
                            key: 'building',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: 'number',
                            key: 'number',
                            width: 100,
                        },
                    ],
                },
                {
                    title: '30.05.24 в 12:00',
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: 'building',
                            key: 'building',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: 'number',
                            key: 'number',
                            width: 100,
                        },
                    ],
                },
                {
                    title: '30.05.24',
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: 'building',
                            key: 'building',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: 'number',
                            key: 'number',
                            width: 100,
                        },
                    ],
                }
            ],
        }
    ];

    const data: DataType[] = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: 'википедия екатерина 1 ',
            age: i + 1,
            street: 'Lake Park',
            building: '1',
            number: 4,
            companyAddress: 'Lake Street 42',
            companyName: 'SoftLake Co',
            gender: 'M',
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
                    <span>Результаты проверок</span>
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
                <span className={cls.text}>{'>'}100 - позиция в поисковой системе не входит в топ-100</span>
            </div>
        </ConfigProvider>
    );
};


