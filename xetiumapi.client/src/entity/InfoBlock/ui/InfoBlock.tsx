import cls from "./InfoBlock.module.scss";

export const InfoBlock = () => {

    return (
        <div className={cls.container}>
            <span className={cls.header}>Информационный блок</span>

            <span className={cls.text}>
                <span style={{color: '#F66450', fontWeight: 600}}>Интент пользователя</span> - цель поискового запроса пользователя.
            </span>

            <span className={cls.text}>
                Это причина, по которой он ввёл ключевую фразу в поиск. Если вы знаете цель запроса
                пользователя, вы сможете создать для страницы релевантный текст и увеличить
                шансы попасть в топ поисковой выдачи по нужным запросам.
            </span>

            <span className={cls.text}>
                Если не подстраиваться под поисковые цели пользователей, шансов на выход в топ
                выдачи по конкурентным запросам почти нет.
            </span>

            <span className={cls.text} style={{color: '#878787'}}>
                Даже точное попадание в интент пользователя не гарантирует попадания в топ
                выдачи. Нельзя забывать о внутренней оптимизации и регулярных
                обновлений сайта.
            </span>
        </div>
    );
};


