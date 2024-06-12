import cls from "./AddKeyWords.module.scss";
import {useState} from 'react';
import {Button, Input, Checkbox, GetProp, ConfigProvider} from "antd";
import {FileSyncOutlined} from '@ant-design/icons';
import {CheckPositionValidator} from "@/shared/lib/validator/checkPosition/checkPosition.ts";
import {useCreateWordClusterMutation} from "@/entity/WordsCluster";
import {useGetSitePositionMutation} from "../api/addKeyWords.api.ts";

const {TextArea} = Input;

export const AddKeyWords = () => {
    const [inputValue, setInputValue] = useState('');
    const [validateInputValue, setValidateInputValue] = useState(false);
    const [validateSystem, setValidateSystem] = useState(false);

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        const isAnyChecked = checkedValues.length > 0;
        setValidateSystem(!isAnyChecked);
    };


    const [createCluster, {isLoading: isLoadingCluster}] = useCreateWordClusterMutation()
    const [getSitePosition, {isLoading: isLoadingSitePosition}] = useGetSitePositionMutation()


    const onInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const options = [
        {label: 'Yandex', value: 'Yandex'},
        {label: 'Google', value: 'Google'},
    ];

    const handleGenerate = () => {
        if (validate()) {

        }
    }

    const saveCluster = () => {
        if (validate()) {
            createCluster({
                keywords: inputValue.split(', ')
            })
        }
    }

    const validate = (): boolean => {
        let inv = CheckPositionValidator.validateInputValue(inputValue);
        setValidateInputValue(!inv);

        return inv && validateSystem;
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
                <span className={cls.header}>Добавление ключевых слов</span>

                <div className={cls.block}>
                    <span className={cls.textUp} style={{marginTop: "-2em"}}>Выберите поисковую систему:</span>
                    <Checkbox.Group options={options} defaultValue={['Google']} onChange={onChange}
                                    className={cls.textUp} style={{marginTop: "8px"}}/>

                    {
                        (validateSystem) &&
                        <span style={{fontSize: '12px', color: 'rgb(246, 100, 80)'}}>
                            Необходимо выбрать систему поиска!
                        </span>
                    }
                </div>


                <div className={cls.block}>
                    <span className={cls.textUp}>Ключевые слова</span>
                    <TextArea autoSize={{minRows: 4, maxRows: 4}}
                              placeholder={'Введите ключевые слова, например: новости, википедия...'}
                              style={{marginTop: "8px", width: "720px", fontFamily: "Montserrat"}}
                              value={inputValue}
                              onChange={onInputChange}
                    >
                    </TextArea>

                    {
                        validateInputValue &&
                        <span style={{fontSize: '13px', marginBottom: '-5px', color: 'rgb(246, 100, 80)'}}>
                            Количество запросов должно быть в диапазоне от 1 до 15!
                        </span>
                    }

                    <span className={cls.textFooter}>Введите запросы - каждый запрос через запятую. Поиск осуществляется в топ-100.</span>
                </div>


                <div className={cls.footer}>
                    <Button className={cls.btn}
                            onClick={saveCluster}><FileSyncOutlined/>{isLoadingCluster ? 'отправка' : 'Сохранить как кластер'}
                    </Button>
                    <Button className={cls.btn}
                            onClick={handleGenerate}><FileSyncOutlined/>{isLoadingSitePosition ? 'отправка' : 'Отправить слова'}
                    </Button>
                </div>
            </div>
        </ConfigProvider>
    );
};


