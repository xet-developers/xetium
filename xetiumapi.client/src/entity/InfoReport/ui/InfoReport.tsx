import cls from "./InfoReport.module.scss";

export const InfoReport = () => {

    return (
        <div className={cls.container}>
            <span className={cls.header}>Информационный блок</span>

            <span className={cls.text}>
                <span style={{color: '#F66450', fontWeight: 600}}>Отчёты</span> - это вся информация о проверках по выбранным критериям.
            </span>

            <span className={cls.text}>
                На данный момент вы можете сформировать только один вид отчета -
                динамика позиций сайта за интервал времени. Остальные виды отчётов
                сейчас находятся в разработке.
            </span>

            <span className={cls.text}>
                Для генерации отчета нужно выбрать интервал времени,
                шаблон и, по необходимости, кластер. Без кластера вы получите
                всю динамику позиций за выбранный интервал.
            </span>

            <span className={cls.text} style={{color: '#878787'}}>
                Ниже будет представлена таблица со всеми отчётами, скачать которые
                вы сможете в любое время.
            </span>
        </div>
    );
};


