import { memo } from 'react';
import cls from "./WordEndLanding.module.scss";
import logo from '../../../../public/logotype.svg';
import { Button, ConfigProvider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const WordEndLanding = memo(() => {

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
                <div className={cls.words}>
                    <span style={{fontWeight: '600', color: '#252525'}}>Xetium</span> постоянно развивается <br/>
                    и расширяет свои возможности ради вас
                </div>

                <Link to={'/registration'}>
                    <Button className={cls.btn}>
                        <span className={cls.textBtn}>Перейти к проектам</span>
                    </Button>
                </Link>
            </div>
        </ConfigProvider>
    );
});


