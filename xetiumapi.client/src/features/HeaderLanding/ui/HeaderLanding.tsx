import { memo } from 'react';
import cls from "./HeaderLanding.module.scss";
import logo from '../../../../public/logotype.svg';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

export const HeaderLanding = memo(() => {

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
            <header className={cls.headerSpace}>
                <div className={cls.left}>
                    <img src={logo} alt="Logo"/>
                    <div className={cls.menu}>
                        <a className={cls.menuItem} href='#about'>О сервисе</a>
                        <a className={cls.menuItem} href='#functions'>Инструменты</a>
                    </div>
                </div>

                <div className={cls.right}>
                    <Link to={'/authorization'} className={cls.text}>
                    <span>
                        Вход
                    </span>
                    </Link>

                    <Link to={'/registration'}>
                        <Button className={cls.btn}>
                            <span className={cls.textBtn}>Попробовать бесплатно</span>
                        </Button>
                    </Link>
                </div>
            </header>
        </ConfigProvider>
    );
});


