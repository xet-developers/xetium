import cls from "./CalendarWidget.module.scss";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {Calendar, Badge, BadgeProps, CalendarProps, Alert} from "antd";
import {useState} from 'react';
import {CreateCheckModal} from "@/features/CreateCheckModal/CreateCheckModal.tsx";
import {ViewCheckModal} from "@/features/ViewCheckModal/ViewCheckModal.tsx";
import {useGetAllCheckQuery} from "@/features/CreateCheckModal";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";

export const CalendarWidget = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const currentProject = useSelector(currentProjectId)
    const {data: userChecks} = useGetAllCheckQuery({
        id: currentProject,
        date: 'firstDate=2024-01-01T00:00:00Z&lastDate=2024-12-31T23:59:59Z'
    })


    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const getListData = (value: Dayjs) => {
        const listData = [];
        console.log(userChecks)

        if (userChecks?.UncompletedTask) {
            console.log(userChecks)
            for (const uncT of userChecks.UncompletedTask) {

                if (value.format('MM:DD:YYYY') === dayjs(uncT.scheduleTime).format('MM:DD:YYYY')) {
                    console.log(uncT.keywords)
                    listData.push(
                        {
                            type: 'error',
                            content: uncT.keywords,
                        })
                }
            }
        }

        return listData;
    };

    const getTotalListDataCount = () => {
        const daysInMonth = value.daysInMonth();
        const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1); // Создаем массив чисел от 1 до количества дней в месяце

        const totalListDataCount = daysArray.reduce((acc, day) => {
            const currentDate = value.clone().date(day);
            const listData = getListData(currentDate);
            return acc + listData.length; // Суммируем длины listData
        }, 0);

        return totalListDataCount;
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 4) {
            return `В этом месяце ${getTotalListDataCount()} проверки`;
        }
    };

    const monthCellRender = (value: Dayjs) => {
        const str = getMonthData(value);
        return str ? (
            <div className={cls.notesMonth}>
                <section>{str}</section>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className={cls.events}>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const [isModalCheckOpen, setIsModalCheckOpen] = useState(false);

    const showCheckModal = () => {
        setIsModalCheckOpen(true);
    };

    return (
        <div>
            <div className={cls.blockCalendar}>
                <div className={cls.blockHeaderCalendar}>
                    <div className={cls.headerCalendar}>
                        <span className={cls.header}>Календарь с запланированными проверками</span>
                        <button onClick={openModal} className={cls.buttonPlan}>+ Запланировать</button>
                    </div>

                </div>

                {getListData(value).length > 0 ? (
                    <Alert
                        message={`${selectedValue?.format('DD.MM.YYYY')} запланировано следующее количество проверок: ${getListData(value).length}`}
                        className={cls.alert}/>
                ) : <Alert message={`${selectedValue?.format('DD.MM.YYYY')} проверки не запланированы`}
                           className={cls.alertNull}/>}

                <div className={cls.calendar}>
                    <Calendar cellRender={cellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange}/>
                </div>
            </div>

            <div>
                {modalOpen && <CreateCheckModal modalOpen={modalOpen} closeModal={closeModal}/>}
            </div>

            <div>
                {<ViewCheckModal open={false} date={value} time={'20:00'}/>}
            </div>
        </div>

    );
};


