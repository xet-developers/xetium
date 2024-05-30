import cls from "./CreateCheckModule.module.scss";
import { useState, useEffect } from 'react';
import React from 'react';
import {RawModal} from "@/shared/ui/components/RawModal/RawModal.tsx";
import { DownOutlined, CalendarOutlined, FieldTimeOutlined, RetweetOutlined, ClusterOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Calendar, theme, TimePicker, MenuProps, Dropdown, message, Space, Checkbox, Select } from 'antd';
import dayjs from 'dayjs';
import {usePostCreateCheckMutation} from "./api/CreateCheckModal.api.ts";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";

export const CreateCheckModal = ({modalOpen, closeModal}):React.JSX.Element => {
    const [time, setTime] = React.useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState([]);
    const [cluster, setCluster] = React.useState(null);
    const [repeat, setRepeat] = React.useState(null);
    const [date, setDate] = useState(() => dayjs('2024-05-21'));
    const [trigger, {isLoading, data}] = usePostCreateCheckMutation()
    const currentProject = useSelector(currentProjectId)

    const { token } = theme.useToken();
    const format = 'HH:mm';

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const handleCheckboxChange = (e: { target: { checked: any; value: any; }; }) => {
        const { checked, value } = e.target;
        if (checked) {
            setSelectedCheckbox([...selectedCheckbox, value]);
        } else {
            setSelectedCheckbox(selectedCheckbox.filter((item) => item!== value));
        }
    };

    const handleChangeCluster = (value: string | React.SetStateAction<null>) => {
        setCluster(value);
    };
    useEffect(() => {
    }, [cluster]);

    const handleChangeRepeat = (value: React.SetStateAction<null>) => {
        setRepeat(value);
    };

    useEffect(() => {
    }, [repeat]);

    const items: MenuProps['items'] = [
        {
            label: 'Кластер №1',
            key: '1',
        },
        {
            label: 'Кластер №2',
            key: '2',
        },
        {
            label: 'Кластер №3',
            key: '3',
        },
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Вы выбрали кластер №${key}`);
        handleChangeCluster(key)
    };

    const handleSelect = (date) => {
        setDate(date);
    };

    const handleTimeChange = (value) => {
        setTime(value.format('HH:mm'));
    };
    useEffect(() => {
    }, [time]);

    const handleSetCheck = async () => {
        const a = await trigger({
            projectID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            dateTime: "2024-05-30T15:56:00.081Z",
            frequency: 0,
            url: "string",
            keywords: [],
            searchSystem: 0,
            top: 0
        })

        console.log('dsadsadsadsadasdsadsa')
        console.log(a)
    }

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <RawModal onSubmint={handleSetCheck} isOpen={modalOpen} onClose={closeModal} className={cls.Modal} textBtn={'Отмена'}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F66450'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        }
                    }
                }}
            >
                <div style={{marginTop: '1em', marginLeft: '1em', display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <div className={cls.blockData}>
                        <div className={cls.headerData}>
                            <CalendarOutlined style={{color: '#454545'}}/>
                            <span>Дата</span>
                        </div>
                        <div style={wrapperStyle}>
                            <Calendar fullscreen={false} value={date} onChange={handleSelect}/>
                            <span style={{fontSize: '12px'}}>Выбранная дата: {date ? date.format('DD.MM.YYYY') : 'Не выбрана'}</span>
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <FieldTimeOutlined style={{color: '#454545'}}/>
                                <span>Время</span>
                            </div>
                            <TimePicker minuteStep={15} hourStep={1} format={format} style={{colorPrimary: '#252525', marginTop: '1em'}} onChange={handleTimeChange}/>
                        </div>

                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <RetweetOutlined style={{color: '#454545'}}/>
                                <span>Повторение</span>
                            </div>

                            <Space wrap>
                                <Select
                                    defaultValue="Каждую неделю"
                                    style={{ width: 200, marginTop: '1em', colorPrimary: '#252525'}}
                                    onChange={handleChangeRepeat}
                                    options={[
                                        { value: 'Каждую неделю', label: 'Каждую неделю' },
                                        { value: 'Каждый месяц', label: 'Каждый месяц' },
                                    ]}
                                />
                            </Space>
                        </div>

                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <ClusterOutlined style={{color: '#454545'}}/>
                                <span>Кластер ключевых слов</span>
                            </div>
                            <Dropdown menu={{items, onClick }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{marginTop: '1em', fontSize: '12px'}}>
                                        Выберите кластер
                                        <DownOutlined/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <SearchOutlined style={{color: '#454545'}}/>
                                <span>Поисковая система</span>
                            </div>
                            <div className={cls.checkbox}>
                                <Checkbox onChange={handleCheckboxChange} value="Yandex">Yandex</Checkbox>
                                <Checkbox onChange={handleCheckboxChange} value="Google">Google</Checkbox>
                            </div>
                        </div>
                    </div>
                    {/*<p>Данные проверки: {date.format('DD.MM.YYYY')} в {time}, повторять {repeat}, использовать кластер №{cluster}, искать в {selectedCheckbox}</p>*/}
                </div>

            </ConfigProvider>
        </RawModal>
    );
};
