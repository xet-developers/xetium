import cls from "./ResultsLast.module.scss";
import {ConfigProvider} from "antd";
import {taskInfo, useGetAllCheckQuery} from "@/features/CreateCheckModal";
import {useSelector} from "react-redux";
import {currentProjectId} from "@/entity/Project";
import dayjs from "dayjs";
import {useEffect, useMemo, useState} from "react";
import { useCreateReportMutation } from "../api/resultsLast.api";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage.ts";


export const ResultsLast = () => {
    const currentProject = useSelector(currentProjectId)
    const {data: userCheck} = useGetAllCheckQuery({
        id: currentProject!, date: 'firstDate=2024-01-01T00:00:00Z&lastDate=2024-12-31T23:59:59Z'
    })
    const [trigger, {isLoading, data}] = useCreateReportMutation()
    const [report, setReport] = useState('')
    const [detectedC, setDetectedC] = useState(false)

    const generateReport = async (taskInfo: taskInfo) => {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

        await fetch('/generation/positionreport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' +  token
            },
            body: JSON.stringify({
                    firstDate: '2024-01-01T00:00:00Z',
                    lastDate: '2024-06-15T20:00:00Z',
                    clusterId: taskInfo.ClusterId,
                    projectId: taskInfo.ProjectId
            })
        }).then(res => {
            return res.blob()
        }).then(blob => {
            setDetectedC(!detectedC)

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

                           { detectedC ?
                                (<a download='sitePositionReport.xlsx' href={report}>Скачать отчет</a>) :
                                'Сформировать отчет '
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


