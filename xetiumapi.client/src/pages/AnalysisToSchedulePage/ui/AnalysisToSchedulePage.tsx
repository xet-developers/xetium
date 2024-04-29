import { useState } from 'react';
import cls from './AnalysisToSchedulePage.module.scss';
import {CreateCheckModal} from "@/features/CreateCheckModal/CreateCheckModal.tsx";


export const AnalysisToSchedulePage = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [modalOpen, setModalOpen] = useState(false);

    const nextMonth = () => {
        setMonth(prevMonth => (prevMonth + 1) % 12);
    };

    const prevMonth = () => {
        setMonth(prevMonth => (prevMonth - 1 + 12) % 12);
    };

    const currentMonth = () => {
        setMonth(new Date().getMonth());
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={cls.page}>

            <div className={cls.headerSpace}>
                <span className={cls.header}>Расписание проверки позиций</span>
            </div>

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

                <div className={cls.calendar}>

                </div>
            </div>

            <div>
                {modalOpen && <CreateCheckModal modalOpen={modalOpen} closeModal={closeModal}/>}
            </div>
        </div>
    );
};
