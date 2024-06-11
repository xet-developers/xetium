import { memo } from 'react';
import cls from "./ElementFirstFunctionLanding.module.scss";
import calendar from '../../../../public/calendar.svg';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

export const ElementFirstFunctionLanding = memo(() => {

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
                <div style={{marginLeft:'185px'}}>
                    <img src={calendar}/>
                </div>

                <div className={cls.right}>
                    <span className={cls.service}>Распоряжайтесь своим временем</span>

                    <span className={cls.desc}>
                        Используйте нашу новую систему с календарем для эффективного <br></br>
                        использования времени.  Выбирайте <span style={{fontWeight: '600', fontStyle: 'italic', color: 'white'}}>время, дату и частоту повторения</span> <br></br>
                         для систематичного отслеживания положения вашего проекта в поисковиках.
                    </span>

                    <Link to={'/registration'}>
                        <Button className={cls.btn}>
                            <span className={cls.textBtn}>Попробовать новую функцию</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </ConfigProvider>
    );
});


