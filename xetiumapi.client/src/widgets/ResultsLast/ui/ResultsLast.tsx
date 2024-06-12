import cls from "./ResultsLast.module.scss";
import {ConfigProvider} from "antd";
import {useGetAllCheckQuery} from "@/features/CreateCheckModal";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";
import dayjs from "dayjs";
import {useMemo} from "react";


export const ResultsLast = () => {
        const currentProject = useSelector(currentProjectId)
        const {data: userCheck} = useGetAllCheckQuery({
            id: currentProject,
            date: 'firstDate=2024-01-01T00:00:00Z&lastDate=2024-12-31T23:59:59Z'
        })

        const userChecks = useMemo(() => {
            if (userCheck) {
                if (userCheck.CompletedTask)
                    return userCheck.CompletedTask.map((el, index) => {
                        if (index > 5) {
                            return
                        }
                        return (
                            <div className={cls.check}>
                                <span className={cls.text}>{dayjs(el.Date).format('DD.MM.YY')}</span>
                                <span className={cls.text}>{dayjs(el.Date).format('DD.MM.YY')}</span>
                                <span className={cls.text}>Успешно</span>
                                <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                            </div>)
                    })
                else {
                    return (<div></div>)
                }
            }
        },[userCheck, currentProject])


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
                    <span className={cls.header}>Результаты запланированных проверок</span>
                    {/*Все как ты любишь <3*/}

                    {userChecks}

                    {/*<div className={cls.check}>*/}
                    {/*    <span className={cls.text}>30.05.24</span>*/}
                    {/*    <span className={cls.text}>17:00</span>*/}
                    {/*    <span className={cls.text}>Успешно</span>*/}
                    {/*    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>*/}
                    {/*</div>*/}

                    {/*<div className={cls.check}>*/}
                    {/*    <span className={cls.text}>30.05.24</span>*/}
                    {/*    <span className={cls.text}>17:00</span>*/}
                    {/*    <span className={cls.text}>Успешно</span>*/}
                    {/*    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>*/}
                    {/*</div>*/}

                    {/*<div className={cls.check}>*/}
                    {/*    <span className={cls.text}>30.05.24</span>*/}
                    {/*    <span className={cls.text}>17:00</span>*/}
                    {/*    <span className={cls.text}>Успешно</span>*/}
                    {/*    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>*/}
                    {/*</div>*/}

                    {/*<div className={cls.checkError}>*/}
                    {/*    <span className={cls.textError}>30.05.24</span>*/}
                    {/*    <span className={cls.textError}>17:00</span>*/}
                    {/*    <span className={cls.textError}>Ошибка</span>*/}
                    {/*    <span className={cls.textError} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>*/}
                    {/*</div>*/}

                    {/*<div className={cls.checkError}>*/}
                    {/*    <span className={cls.textError}>30.05.24</span>*/}
                    {/*    <span className={cls.textError}>17:00</span>*/}
                    {/*    <span className={cls.textError}>Ошибка</span>*/}
                    {/*    <span className={cls.textError} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>*/}
                    {/*</div>*/}
                </div>
            </ConfigProvider>
        );
    }
;


