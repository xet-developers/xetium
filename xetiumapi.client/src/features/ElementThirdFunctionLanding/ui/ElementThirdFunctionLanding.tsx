import { memo } from 'react';
import cls from "./ElementThirdFunctionLanding.module.scss";
import search from '../../../../public/search.svg';
import cluster from '../../../../public/cluster.svg';
import report from '../../../../public/report.svg';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

export const ElementThirdFunctionLanding = memo(() => {

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
                        defaultActiveBg: '#d1dcff',
                        defaultHoverBg: '#dfe7ff'
                    }
                }
            }}
        >
            <div className={cls.container}>
                <div className={cls.blocks}>
                    <div className={cls.leftBlock}>
                        <img src={search} className={cls.image}/>
                        <span className={cls.header}>Проверка и анализ позиций сайта</span>
                        <span className={cls.desc}>
                            Проверка позиции вашего
                            сайта в поисковых системах
                            по желаемому набору запросов.
                            Предоставляем также динамику
                            изменения позиций.
                        </span>
                    </div>

                    <div className={cls.centerBlock}>
                        <img src={cluster} className={cls.image}/>
                        <span className={cls.header}>Кластеризация запросов</span>
                        <span className={cls.desc}>
                            Есть возможность составить кластеры
                            запросов для формирования полноценного семантического ядра. Выделяйте ключевые
                            слова, а Xetium подготовит для вас
                            полноценный список всех запросов.
                        </span>
                    </div>

                    <div className={cls.rightBlock}>
                        <img src={report} className={cls.image}/>
                        <span className={cls.header}>Отчёты</span>
                        <span className={cls.desc}>
                            Результаты проведенных проверок
                            позиций сайта предоставляются в
                            формате XLS. Запрашивайте отчеты за определенный промежуток времени,
                            формируйте их заново при утере.
                        </span>
                    </div>
                </div>

                <Link to={'/registration'} style={{marginTop: '6.5em'}}>
                    <Button className={cls.btn}>
                        <span className={cls.textBtn}>Попробовать</span>
                    </Button>
                </Link>
            </div>
        </ConfigProvider>
    );
});


