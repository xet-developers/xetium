import cls from "@/pages/AnalysisToSchedulePage/ui/CalendarWidget.module.scss";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Calendar, Badge, BadgeProps, CalendarProps, Alert } from "antd";
import { useState } from 'react';
import {CreateCheckModal} from "@/features/CreateCheckModal/CreateCheckModal.tsx";

export const CalendarWidget = () => {
    const [, setMonth] = useState(new Date().getMonth());
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const nextMonth = () => {
        setMonth(prevMonth => (prevMonth + 1) % 12);
    };

    const prevMonth = () => {
        setMonth(prevMonth => (prevMonth - 1 + 12) % 12);
    };

    const currentMonth = () => {
        setMonth(new Date().getMonth());
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const getListData = (value: Dayjs) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'Проверка 1' },
                    { type: 'success', content: 'Проверка 2' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'Проверка 2' },
                ];
                break;
            case 13:
                listData = [
                    { type: 'warning', content: 'Проверка 1' },
                ];
                break;
            default:
        }
        return listData || [];
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className={cls.notesMonth}>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className={cls.events}>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
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

    const [value, setValue] = useState(() => dayjs('2024-05-21'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-05-21'));

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className={cls.blockCalendar}>
                <div className={cls.blockHeaderCalendar}>
                    <div className={cls.headerCalendar}>
                        <span className={cls.header}>Календарь с запланированными проверками</span>
                        <button onClick={openModal} className={cls.buttonPlan}>+ Запланировать</button>
                    </div>

                    <div className={cls.blockSwitch}>
                        <button onClick={prevMonth} className={cls.month}>{'<'}</button>
                        <button onClick={currentMonth} className={cls.currentMonth}>текущий месяц</button>
                        <button onClick={nextMonth} className={cls.month}>{'>'}</button>
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
        </div>

    );
};

