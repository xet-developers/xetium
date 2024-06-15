import cls from "./ResultGeneration.module.scss";
import {useState, useEffect, useMemo} from 'react';
import {Button, ConfigProvider, Table, TableProps, Skeleton} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import {getIntends, IntentType} from "@/widgets/CreateRequest1";
import {useSelector} from "react-redux";


export const ResultGeneration = () => {

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [generation, setGeneration] = useState(true);
    const intends = useSelector(getIntends)


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


    const columns: TableProps['columns'] = [
        {
            title: 'Навигационный',
            dataIndex: IntentType.Navigation,
        },
        {
            title: 'Информационный',
            dataIndex: IntentType.Informational,
        },
        {
            title: 'Сравнительный',
            dataIndex: IntentType.Comparison,
        },
        {
            title: 'Транзакционный',
            dataIndex: IntentType.Transactional,
        }
    ];

    const data = useMemo(() => {
        if (intends) {
            console.log(intends)
            let tableElements = []

            for(let i = 0; i < intends.comparison.length; i++) {
                tableElements.push({})
            }

            for(let i = 0; i < intends.comparison.length; i++){
                tableElements[i][IntentType.Comparison] = intends.comparison[i]
            }
            for(let i = 0; i < intends.navigational.length;i++){
                tableElements[i][IntentType.Navigation] = intends.navigational[i]
            }
            for(let i = 0; i < intends.informational.length;i++){
                tableElements[i][IntentType.Informational] = intends.informational[i]
            }
            for(let i = 0; i < intends.transactional.length;i++){
                tableElements[i][IntentType.Transactional] = intends.transactional[i]
            }

            console.log(tableElements)
            return tableElements
        }

        return []
    }, [intends])


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
                        disabled={!intends}
                    >
                        Скачать в формате Excel
                    </Button>
                </div>

                <div className="blockData">
                    {generation ? (
                        <Skeleton active className={cls.skeleton}/>
                    ) : (
                        <Table columns={columns} dataSource={data} className="blockData"/>
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
};


