import cls from "../../../widgets/ResultCheckTable/ui/ResultCheckTable.module.scss";
import {useState, useEffect} from 'react';
import {ConfigProvider, Table, TableColumnsType, Skeleton} from "antd";
import {useSelector} from "react-redux";

import dayjs from "dayjs";
import {sitePositionCheck} from "@/widgets/AddKeyWords";


const dateFormat = 'DD.MM.YY:HH'

export const ResultCheckTable = () => {

    const sitePositions = useSelector(sitePositionCheck)
    const [generation, setGeneration] = useState(true);

    const [tableColumns, setTableColumns] = useState<TableColumnsType>()
    const [tableData, setTableData] = useState()


    useEffect(() => {
        if (sitePositions) {
            const a: Set<string> = new Set()
            for (let tasks of sitePositions) {
                a.add(dayjs(tasks.date).format(dateFormat))
            }

            setTableColumns(
                [
                    {
                    title: 'Ключевые фразы',
                    dataIndex: 'keyword',
                    key: 'keyword',
                    width: 250,
                    fixed: 'left',
                }, {
                    title: 'Яндекс',
                    dataIndex: '1',
                    key: '1',
                    width: 100,
                    }, {
                    title: 'Google',
                    dataIndex: '0',
                    key: '0',
                    width: 100,
                    },]
            )

            const data: any[] = [];
            const keywords = new Set()

            for (const task of sitePositions) {

                let prSize = keywords.size
                let nextSize = keywords.add(task.keyword).size

                if (prSize !== nextSize) {
                    const res = {
                        keyword: task.keyword,
                    }


                    // @ts-ignore
                    res[task.searchSystem] = task.position
                    console.log(res)
                    data.push(res)
                }

            }
            setTableData(data)
        }
    }, [sitePositions]);


    useEffect(() => {
        setTimeout(() => {
            setGeneration(false);
        }, 3000);
    }, []);


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
                            columns={tableColumns}
                            bordered
                            dataSource={tableData}
                            size="middle"
                            scroll={{x: 'calc(700px + 50%)', y: 280}}
                            className={cls.table}
                        />
                    )}
                </div>
                <span className={cls.text}>{'>'}100 - позиция в поисковой системе не входит в топ-100</span>
            </div>
        </ConfigProvider>
    );
};


