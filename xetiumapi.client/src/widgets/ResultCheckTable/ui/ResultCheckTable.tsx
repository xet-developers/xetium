import cls from "./ResultCheckTable.module.scss";
import  { useState, useEffect } from 'react';
import { Button, ConfigProvider, Table, TableProps, Skeleton } from "antd";
import { DownloadOutlined } from '@ant-design/icons';


export const ResultCheckTable = () => {

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [generation, setGeneration] = useState(true);

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
                    {generation? (
                        <Skeleton active className={cls.skeleton}/>
                    ) : (
                        <span>{'>'}100 - позиция в поисковой системе не входит в топ-100</span>
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
};


