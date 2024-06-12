import { memo } from 'react';
import cls from "./ElementSecondFunctionLanding.module.scss";
import generation from '../../../../public/generation.svg';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

export const ElementSecondFunctionLanding = memo(() => {

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
                <div className={cls.left}>
                    <span className={cls.service}>Расширьте площадь поиска для вашего сайта</span>

                    <span className={cls.desc}>
                        При помощи автогенерации запросов вы легко сможете<br></br>
                        составить <span style={{fontWeight: '600', fontStyle: 'italic', color: 'white'}}>разнообразные наборы ключевых слов</span>, которые потом можно <br></br>
                        использовать при разработке своих проектов. Это позволит вам значительно <br></br>
                        увеличить вероятность нахождения вашего сайта в топах поисковика.
                    </span>

                    <Link to={'/registration'}>
                        <Button className={cls.btn}>
                            <span className={cls.textBtn}>Попробовать новую функцию</span>
                        </Button>
                    </Link>
                </div>

                <div style={{marginRight: '185px'}}>
                    <img src={generation}/>
                </div>
            </div>
        </ConfigProvider>
    );
});


