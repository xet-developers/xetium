import cls from "./Clusters.module.scss";
import { Button, ConfigProvider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {DeleteModal} from "@/features/DeleteCheckModal/DeleteModal.tsx";

export const Clusters = () => {

    const clusters: string[] = [];
    const [deleteAction, setDeleteAction] = useState(false);

    const empty = () => {
        return (
            <div className={cls.blockEmpty}>
                <span className={cls.empty}>
                    Вы еще не сохранили ни одного кластера!
                </span>
            </div>

        )
    }

    const warning = () => {
        setDeleteAction(true);
        setTimeout(costil, 5000)
    }

    const costil = () => {
        setDeleteAction(false);
    }

    const cluster = () => {
        return (
            /*<div className={cls.clusters} style={{maxWidth: '740px', overflowX: "auto"}}>
                {clusters.map((cluster, index) => (
                    <div key={index} className={cls.blockCluster}>
                        <span className={cls.text}>{`Кластер №${index + 1}`}</span>
                        <span className={cls.textCluster} style={{maxHeight: "200px", overflowY: "auto"}}>
                        {cluster.join(', ')}
                    </span>
                        <Button className={cls.btn}><DeleteOutlined/>Удалить кластер</Button>
                    </div>
                ))}
            </div>*/
        <div className={cls.clusters} style={{maxWidth: '740px', overflowX: "auto"}}>
            <div className={cls.blockCluster}>
                <span className={cls.text}>Кластер №1</span>
                <span className={cls.textCluster} style={{maxHeight: "100px", overflowY: "auto"}}>
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, словослово,
                        слово, слово, слово, словослово, слово,
                        слово, слово, словослово, слово, слово, слово,
                        слово
                    </span>
                    <Button className={cls.btn} onClick={warning}><DeleteOutlined/>Удалить кластер</Button>
                </div>

                <div className={cls.blockCluster}>
                    <span className={cls.text}>Кластер №1</span>
                    <span className={cls.textCluster} style={{maxHeight: "200px", overflowY: "auto"}}>
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, словослово,
                        слово, слово, слово, словослово, слово,
                        слово, слово, словослово, слово, слово, слово,
                        слово
                    </span>
                    <Button className={cls.btn}><DeleteOutlined/>Удалить кластер</Button>
                </div>

                <div className={cls.blockCluster}>
                    <span className={cls.text}>Кластер №1</span>
                    <span className={cls.textCluster} style={{maxHeight: "200px", overflowY: "auto"}}>
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, слово
                        слово, слово, слово, слово, словослово,
                        слово, слово, слово, словослово, слово,
                        слово, слово, словослово, слово, слово, слово,
                        слово
                    </span>
                    <Button className={cls.btn}><DeleteOutlined/>Удалить кластер</Button>
                </div>

                { deleteAction && <DeleteModal open={true} cluster={true}/> }
            </div>
        )
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
                <span className={cls.header}>Сохраненные кластеры</span>
                {!clusters ? (
                    empty()
                ) : (
                    cluster()
                )}
            </div>
        </ConfigProvider>
    );
};


