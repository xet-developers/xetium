import cls from "./ResultsLast.module.scss";
import {ConfigProvider} from "antd";
import {taskInfo, useGetAllCheckQuery} from "@/features/CreateCheckModal";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";
import dayjs from "dayjs";
import {useMemo, useState} from "react";
import { useCreateReportMutation } from "../api/resultsLast.api";


export const ResultsLast = () => {
    const currentProject = useSelector(currentProjectId)
    const {data: userCheck} = useGetAllCheckQuery({
        id: currentProject!, date: 'firstDate=2024-01-01T00:00:00Z&lastDate=2024-12-31T23:59:59Z'
    })
    const [trigger, {isLoading}] = useCreateReportMutation()
    const [report, setReport] = useState('')

    const generateReport = async (taskInfo: taskInfo) => {
        await trigger({
            firstDate: taskInfo.CompletionTime,
            lastDate: taskInfo.CompletionTime,
            clusterId: taskInfo.ClusterId,
            projectId: taskInfo.ProjectId
        }).then(resp => {
            return resp.blob()
        }).then(blob => {
            setReport(URL.createObjectURL(blob))
        })
    }

    const userChecks = useMemo(() => {
        if (userCheck) {
            if (userCheck.TaskInfos) return userCheck.TaskInfos.map((el) => {

                return (<div className={cls.check}>
                    <span className={cls.text}>{dayjs(el.CompletionTime).format('DD.MM.YY')}</span>
                    <span className={cls.text}>{dayjs(el.CompletionTime).format('HH:mm')}</span>
                    <span className={cls.text}>Успешно</span>
                    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}
                          onClick={()=>generateReport(el)}>

                        { isLoading ? 'Генирация отчета' :
                            report ?
                                (<a download='sitePositionReport.txt' href={report}>Скачать отчет </a>) :
                                'Сформировать отчет'
                        }

                    </span>
                </div>)
            })

        }
    }, [userCheck, currentProject])


    return (<ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450', colorText: '#252525'
                }, components: {
                    DatePicker: {
                        activeBorderColor: '#F66450'
                    }, Button: {
                        textHoverBg: '#ba4c3b', defaultActiveBg: '#ba4c3b'
                    }
                }
            }}
        >
            <div className={cls.container}>
                <span className={cls.header}>Результаты запланированных проверок</span>
                {/*Все как ты любишь <3*/}

                {userChecks}

                {/*<div className={cls.check}>
                        <span className={cls.text}>30.05.24</span>
                        <span className={cls.text}>17:00</span>
                        <span className={cls.text}>Успешно</span>
                        <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                    </div>*/}

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
        </ConfigProvider>);
};


