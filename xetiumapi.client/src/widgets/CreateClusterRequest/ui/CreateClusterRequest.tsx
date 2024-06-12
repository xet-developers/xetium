import cls from "./CreateClusterRequest.module.scss";
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, ConfigProvider } from "antd";
import { FileSyncOutlined } from '@ant-design/icons';
import {ClusterValidator} from "@/shared/lib/validator/cluster/cluster.ts";

const { TextArea } = Input;

export const CreateClusterRequest = () => {

    const [inputValueClastering, setInputValueClastering] = useState('');
    const [validateInputValueClastering, setValidateInputValueClastering] = useState(false);

    const onChange = (e) => {
        setInputValueClastering(e.target.value);
    };

    const handleGenerate = () => {
        if (validate()) {
            console.log('ok');
        }
    }

    function validate() {
        let invc = ClusterValidator.validateInputValueClustering(inputValueClastering);
        setValidateInputValueClastering(!invc);

        return invc;
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
                <span className={cls.header}>Список запросов</span>

                <div className={cls.keyWords}>
                    <TextArea autoSize={{minRows: 7, maxRows: 7}}
                              placeholder={'Пример: "скачать фильм, лучшие фильмы 2023 года, как снять короткометражку"'}
                              style={{marginTop: "-1.5em", width: "720px", fontFamily: "Montserrat"}}
                              value={inputValueClastering}
                              onChange={onChange}
                    >
                    </TextArea>
                    {
                        validateInputValueClastering &&
                        <span style={{fontSize:'13px', color:'rgb(246, 100, 80)'}}>
                            Количество запросов должно быть в диапазоне от 4 до 15!
                        </span>
                    }
                    <span className={cls.textUp}>Введите запросы - каждый запрос через запятую.</span>
                </div>

                <div className={cls.footer}>
                    <Button className={cls.btn} onClick={handleGenerate}><FileSyncOutlined/>Отправить</Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


