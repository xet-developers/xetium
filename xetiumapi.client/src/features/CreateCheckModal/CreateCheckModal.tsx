import cls from "./CreateCheckModule.module.scss";
import {useMemo, useState} from 'react';
import React from 'react';
import {CalendarOutlined, FieldTimeOutlined, RetweetOutlined, ClusterOutlined, SearchOutlined} from '@ant-design/icons';
import {ConfigProvider, Calendar, theme, TimePicker, Space, Checkbox, Select, Modal, Button} from 'antd';
import dayjs from 'dayjs';
import {usePostCreateCheckMutation} from "./api/CreateCheckModal.api.ts";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";
import {useGetAllWordClusterQuery} from "@/entity/WordsCluster";
import { Link } from "react-router-dom";

export const CreateCheckModal = ({modalOpen, closeModal}): React.JSX.Element => {
    const [time, setTime] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState([]);
    const [curCluster, setCluster] = useState(null);
    const [repeat, setRepeat] = useState(null);
    const [date, setDate] = useState(() => dayjs());
    const [trigger, {isLoading, data}] = usePostCreateCheckMutation()
    const currentProject = useSelector(currentProjectId)

    const {data: cluster} = useGetAllWordClusterQuery(currentProject!)


    const {token} = theme.useToken();
    const format = 'HH:mm';

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const handleCheckboxChange = (e: { target: { checked: any; value: any; }; }) => {
        const {checked, value} = e.target;
        if (checked) {
            setSelectedCheckbox([...selectedCheckbox, value]);
        } else {
            setSelectedCheckbox(selectedCheckbox.filter((item) => item !== value));
        }
    };

    const handleChangeCluster = (value: string | React.SetStateAction<null>) => {
        setCluster(value);
    };


    const handleChangeRepeat = (value: React.SetStateAction<null>) => {
        setRepeat(value);
    };

    const handleSelect = (date) => {
        setDate(date);
    };

    const handleTimeChange = (value) => {
        setTime(value.format('HH:mm'));
    };

    const handleSetCheck = async () => {
        console.log(dayjs().format('YYYY-MM-DD') + 'T' + dayjs().add(1, 'minutes').format('HH:mm') + ':00.000Z')

        const currentCluster = cluster.find(el => el.id === curCluster)
        const a = await trigger({
            projectID: currentProject!,
            dateTime: dayjs().format('YYYY-MM-DD') + 'T' + dayjs().add(1, 'minutes').format('hh:mm') + ':00.000Z',
            frequency: 0,
            url: "string",
            keywords: currentCluster!.keywords,
            searchSystem: 0,
            top: 0,
		    clusterId: curCluster!,
        })

        console.log(a)
    }

    const getClusterOption = useMemo(() => {

        const res: [] = [{
            value: '-1', label: (
                <span>
                       <Link to={'/checksitepositions'} style={{color: '#F66450'}}>+ Создать кластер</Link>
                    </span>
            )
        }]

        if(!cluster || cluster.length === 0){
            return res
        }

        return cluster.map((el, index) => {
                return {
                    value: el.id,
                    label: 'Кластер ' + (index + 1)
                }
            }).concat(res)

    }, [cluster])

    return (
        <Modal onOk={closeModal} open={modalOpen} onCancel={closeModal} className={cls.modalView} footer={null}
               closeIcon={null} width={'730px'} style={{top: '20%'}}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F66450'
                    },
                    components: {
                        DatePicker: {
                            activeBorderColor: '#F66450'
                        },
                        Button: {
                            textHoverBg: '#ba4c3b',
                            defaultActiveBg: '#ba4c3b',
                            defaultHoverColor: '#fff'
                        }
                    }
                }}
            >
                <div style={{height: '570px'}}>
                    <span className={cls.header}>Создание проверки</span>
                    <div className={cls.modal}>
                        <div className={cls.blockData}>
                            <div className={cls.headerData}>
                                <CalendarOutlined style={{color: '#454545'}}/>
                                <span>Дата</span>
                            </div>
                            <div style={wrapperStyle}>
                                <Calendar fullscreen={false} value={date} onChange={handleSelect}
                                          style={{marginBottom: '2em'}}/>
                                <span
                                    style={{fontSize: '14px'}}>Выбранная дата: {date ? date.format('DD.MM.YYYY') : 'Не выбрана'}</span>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                            <div className={cls.blockData}>
                                <div className={cls.headerData}>
                                    <FieldTimeOutlined style={{color: '#454545'}}/>
                                    <span>Время</span>
                                </div>
                                <TimePicker minuteStep={15} hourStep={1} format={format}
                                            style={{colorPrimary: '#252525', marginTop: '1em'}}
                                            onChange={handleTimeChange}/>
                            </div>

                            <div className={cls.blockData}>
                                <div className={cls.headerData}>
                                    <RetweetOutlined style={{color: '#454545'}}/>
                                    <span>Повторение</span>
                                </div>

                                <Space wrap>
                                    <Select
                                        defaultValue="Без повторения"
                                        style={{
                                            width: 200,
                                            marginTop: '1em',
                                            colorPrimary: '#252525',
                                            fontFamily: 'Montserrat, sans-serif'
                                        }}
                                        onChange={handleChangeRepeat}
                                        options={[
                                            {value: 'Без повторения', label: 'Без повторения'},
                                            {value: 'Каждый день', label: 'Каждый день'},
                                            {value: 'Каждую неделю', label: 'Каждую неделю'},
                                            {value: 'Каждый месяц', label: 'Каждый месяц'},
                                        ]}
                                    />
                                </Space>
                            </div>

                            <div className={cls.blockData}>
                                <div className={cls.headerData}>
                                    <ClusterOutlined style={{color: '#454545'}}/>
                                    <span>Кластер ключевых слов</span>
                                </div>
                                <Space wrap>

                                        <Select
                                            defaultValue={'-1'}
                                            style={{
                                                width: 200,
                                                marginTop: '1em',
                                                colorPrimary: '#252525',
                                                fontFamily: 'Montserrat, sans-serif'
                                            }}
                                            onChange={handleChangeCluster}
                                            options={getClusterOption}
                                        />
                                </Space>
                            </div>

                            <div className={cls.blockData}>
                                <div className={cls.headerData}>
                                    <SearchOutlined style={{color: '#454545'}}/>
                                    <span>Поисковая система</span>
                                </div>
                                <div className={cls.checkbox}>
                                    <Checkbox
                                        onChange={handleCheckboxChange}
                                        value="Yandex"
                                        style={{fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: '500'}}
                                    >
                                        Yandex
                                    </Checkbox>

                                    <Checkbox
                                        onChange={handleCheckboxChange}
                                        value="Google"
                                        style={{fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: '500'}}
                                    >
                                        Google
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', gap: '2em', justifyContent: 'center'}}>
                        <Button type="primary" onClick={handleSetCheck} className={cls.btnCreate}>
                            Создать проверку
                        </Button>

                        <Button type="primary" onClick={closeModal} className={cls.btnCancel}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </ConfigProvider>
        </Modal>
    );
};
