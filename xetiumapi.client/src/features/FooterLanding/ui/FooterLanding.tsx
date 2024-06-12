import { memo } from 'react';
import cls from "./FooterLanding.module.scss";
import logo from '../../../../public/logo-mini.svg';
import { ConfigProvider } from 'antd';

export const FooterLanding = memo(() => {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450',
                    colorText: '#252525'
                },
                components: {
                    Button: {
                        defaultBorderColor: 'none',
                        defaultActiveBorderColor: 'none',
                        textHoverBg: 'none',
                        defaultActiveBg: '#ffa8a8',
                        defaultHoverBg: '#ffa8a8'
                    }
                }
            }}
        >
            <div className={cls.container}>
                <div className={cls.info}>
                    <div className={cls.left}>
                        <img src={logo} style={{width: '200px', height: '56px'}}/>
                        <span className={cls.text}>
                            Политика конфиденциальности
                        </span>
                        <span className={cls.text}>
                            Соглашение на обработку<br/>
                            персональных данных
                        </span>
                    </div>

                    <div className={cls.right}>
                        <div className={cls.block}>
                            <span className={cls.header}>
                                ИНСТРУМЕНТЫ
                            </span>
                            <span className={cls.text}>
                                Анализ позиций сайта <br/>
                                Кластеризация запросов<br/>
                                Формирование отчётов<br/>
                            </span>
                        </div>

                        <div className={cls.block}>
                            <span className={cls.header}>
                                СВЯЗАТЬСЯ С НАМИ
                            </span>
                            <span className={cls.text}>
                                xet.developers@mail.ru<br/>
                                Служба поддержки<br/>
                                8 992 012-04-70<br/>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cls.developers}>
                    ©️ XET Development, 2024
                </div>
            </div>
        </ConfigProvider>
    );
});


