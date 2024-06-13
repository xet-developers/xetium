import cls from "./CreateClusterRequestResult.module.scss";
import { Button, ConfigProvider } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import  { useState } from 'react';

export const CreateClusterRequestResult = () => {

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

    const handleGenerate = () => {

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
                <span className={cls.header}>Информация</span>

                <span className={cls.blockText}>
                    <span>
                        После автоматической кластеризации рекомендуется
                        проводить дополнительную ручную кластеризацию.
                        Это помогает довести состояние кластеров до нужного
                        вам состояния и распределить не попавшие в кластеры
                        запросы самостоятельно.
                    </span>

                    <span className={cls.imp}>Результат кластеризации сделан с помощью нейросети и может содержать ошибки.</span>
                </span>

            </div>
        </ConfigProvider>
    );
};


