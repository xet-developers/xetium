import cls from "./ResultsLast.module.scss";
import { ConfigProvider } from "antd";


export const ResultsLast = () => {

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
                <div className={cls.check}>
                    <span className={cls.text}>30.05.24</span>
                    <span className={cls.text}>17:00</span>
                    <span className={cls.text}>Успешно</span>
                    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                </div>

                <div className={cls.check}>
                    <span className={cls.text}>30.05.24</span>
                    <span className={cls.text}>17:00</span>
                    <span className={cls.text}>Успешно</span>
                    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                </div>

                <div className={cls.check}>
                    <span className={cls.text}>30.05.24</span>
                    <span className={cls.text}>17:00</span>
                    <span className={cls.text}>Успешно</span>
                    <span className={cls.text} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                </div>

                <div className={cls.checkError}>
                    <span className={cls.textError}>30.05.24</span>
                    <span className={cls.textError}>17:00</span>
                    <span className={cls.textError}>Успешно</span>
                    <span className={cls.textError} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                </div>

                <div className={cls.checkError}>
                    <span className={cls.textError}>30.05.24</span>
                    <span className={cls.textError}>17:00</span>
                    <span className={cls.textError}>Успешно</span>
                    <span className={cls.textError} style={{textDecoration: 'underline', cursor: 'pointer'}}>Сформировать отчет</span>
                </div>
            </div>
        </ConfigProvider>
    );
};


