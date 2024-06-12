import cls from "./ResultReportTable.module.scss";
import {useState, useEffect} from 'react';
import {ConfigProvider, Table, Skeleton} from "antd";
import type { TableColumnsType, TableProps } from 'antd';

export const ResultReportTable = () => {

    const [generation, setGeneration] = useState(true);

    function format(inputDate: Date) {
        let date, month, year;

        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();

        date = date.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');

        return `${date}/${month}/${year}`;
    }

    useEffect(() => {
        setTimeout(() => {
            setGeneration(false);
        }, 3000);
    }, []);

    interface DataType {
        key: React.Key;
        date: string;
        type: string;
        interval: string;
        link: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            sorter: (a, b) => Date.parse(b.date) - Date.parse(a.date)
        },
        {
            title: 'Тип отчёта',
            dataIndex: 'type',
            filters: [
                {
                    text: 'Динамика позиций сайта за интервал времени',
                    value: 'Динамика позиций сайта за интервал времени',
                },
                {
                    text: 'test',
                    value: 'test',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.type.includes(value as string),
            width: '30%',
        },
        {
            title: 'Интервал',
            dataIndex: 'interval',
        },
        {
            title: 'Ссылка для скачивания',
            dataIndex: 'link',
            render: (text: string) => <a href={text} download className={cls.link}>Скачать</a>,
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            date: format(new Date()),
            type: "Динамика позиций сайта за интервал времени",
            interval: '07.06.24 - 12.06.24',
            link: 'https://post-images.org/photo-page.php?photo=8YPKfLzi',
        },
        {
            key: '2',
            date: '10/05/24',
            type: "test",
            interval: '11.04.24 - 09.05.24',
            link: 'https://post-images.org/photo-page.php?photo=8YPKfLzi',
        },
        {
            key: '3',
            date: format(new Date()),
            type: "Динамика позиций сайта за интервал времени",
            interval: '15.12.23 - 10.06.24',
            link: 'https://post-images.org/photo-page.php?photo=8YPKfLzi',
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // const enterLoading = (index: number) => {
    //     setLoadings((prevLoadings) => {
    //         const newLoadings = [...prevLoadings];
    //         newLoadings[index] = true;
    //         return newLoadings;
    //     });
    //
    //     setTimeout(() => {
    //         setLoadings((prevLoadings) => {
    //             const newLoadings = [...prevLoadings];
    //             newLoadings[index] = false;
    //             return newLoadings;
    //         });
    //     }, 6000);
    // };

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
                            onChange={onChange}
                            className={cls.table}
                        />
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
};


