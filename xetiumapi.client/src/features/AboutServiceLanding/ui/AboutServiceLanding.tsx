import { memo } from 'react';
import cls from "./AboutServiceLanding.module.scss";
import image from '../../../../public/image.svg';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

export const AboutServiceLanding = memo(() => {

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
            <div className={cls.container} id='about'>
                <div className={cls.left}>
                    <span className={cls.service}>Xetium</span>

                    <span className={cls.header}>
                        Лучший помощник
                        <br/>
                        в <span style={{color: '#F66450'}}>
                             SEO-продвижении
                        </span>
                        <br/>
                        вашего проекта
                    </span>

                    <span className={cls.desc}>
                        Проверка позиции сайта в поисковых системах,<br/>
                        составление семантического ядра для сервиса и<br/>
                        впоследствии еще больше удобных инструментов<br/>
                        в развивающемся проекте.
                    </span>

                    <Link to={'/registration'}>
                        <Button className={cls.btn}>
                        <span className={cls.textBtn}>Попробовать бесплатно</span>
                        </Button>
                    </Link>
                </div>

                <div className={cls.right} style={{marginTop: '4em'}}>
                    <img src={image}/>
                </div>
            </div>
        </ConfigProvider>
    );
});


