import cls from "./ResultCheckTable.module.scss";
import {useState, useEffect} from 'react';
import {ConfigProvider, Table, TableColumnsType, Skeleton} from "antd";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";
import {useGetAllCheckQuery} from "@/features/CreateCheckModal";
import dayjs from "dayjs";
import {useGetAllWordClusterQuery} from "@/entity/WordsCluster";


const dateFormat = 'DD.MM.YY:HH'

export const ResultCheckTable = () => {
    const currentProject = useSelector(currentProjectId)
    const {data: userCheck} = useGetAllCheckQuery({
        id: currentProject,
        date: 'firstDate=2024-01-01T00:00:00Z&lastDate=2024-12-31T23:59:59Z'
    })

    const {data: clusters, } = useGetAllWordClusterQuery(currentProject!);

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [generation, setGeneration] = useState(true);

    const [tableColumns, setTableColumns] = useState<TableColumnsType>()
    const [tableData, setTableData] = useState()

    const getFilters = (): { value: string; text: string; }[] => {
        if (clusters) {
            return clusters.map((el, index) => {
                return {
                    value: el.id,
                    text: 'Кластер ' + (index + 1)
                }
            })
        }
        return [];
    }

    useEffect(() => {
        if (userCheck) {
            const a: Set<string> = new Set()

            for (let tasks of userCheck.CompletedTask) {
                a.add(dayjs(tasks.Date).format(dateFormat))
            }

            const res = Array.from(a).map((el) => {
                return {
                    title: el,
                    dataIndex: el,
                    key: el,
                    children: [
                        {
                            title: 'Яндекс',
                            dataIndex: '1',
                            key: '1',
                            width: 100,
                        },
                        {
                            title: 'Google',
                            dataIndex: '0',
                            key: '0',
                            width: 100,
                        },
                    ],
                }
            })

            setTableColumns(
                [{
                    title: 'Ключевые фразы',
                    dataIndex: 'keyword',
                    key: 'keyword',
                    width: 250,
                    fixed: 'left',
                    filters: getFilters(),
                    onFilter: (value, record) => record.clusterId === value,
                },
                    {
                        title: 'Дата и время',
                        children: res
                    }]
            )

            const data: any[] = [];
            const keywords = new Set()

            for (const task of userCheck.CompletedTask) {

                let prSize = keywords.size
                let nextSize = keywords.add(task.Keyword).size

                if (prSize !== nextSize) {
                    const res = {
                        keyword: task.Keyword,
                    }

                    // @ts-ignore
                    res[dayjs(task.Date).format(dateFormat)] = true
                    // @ts-ignore
                    res[task.SearchSystem] = task.Position

                    data.push(res)
                }

            }
            setTableData(data)
        }
    }, [userCheck]);


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


