import {Link} from "react-router-dom";
import {Icon} from "@/shared/ui/components/Icon";
import IconPersonalAccount from "../../assets/account.svg";
import IconEllipse from '../../assets/ellipse.svg';
import IconPlus from "../../assets/plus.svg";
import IconMyProject from "../../assets/my-project.svg";
import IconReport from "../../assets/report.svg";
import IconPosition from "../../assets/position.svg";
import IconSchedule from "../../assets/schedule.svg";
import IconClustering from "../../assets/clusterung.svg";
import IconAuthogeneration from "../../assets/authogeneration.svg";

import cls from "../Menu/Menu.module.scss";
import {Menu} from "antd";

interface MenuItemTypeInterface {
    label: string;
    type: 'item';
    link: string;
    icon: string;
}

interface SubMenuTypeInterface {
    label: string;
    type: 'submenu';
    items: MenuItemTypeInterface[];
}

type MenuItem = MenuItemTypeInterface | SubMenuTypeInterface;

export const MenuItems: MenuItem[] = [
    { label: 'Личный кабинет', link: '/personalaccount', type: 'item', icon: IconPersonalAccount },
    {
        label: 'Имя пространства',
        type: 'submenu',
        items: [
            { label: 'Пространство 1', link: '/myproject', type: 'item', icon: IconEllipse },
            { label: 'Добавить пространство', link: '/myproject', type: 'item', icon: IconPlus }, //сделать кнопкой и сабмит
        ],
    },
    { label: 'Мой проект', link: '/myproject', type: 'item', icon: IconMyProject },
    { label: 'Отчеты', link: '/reports', type: 'item', icon: IconReport },
    { label: 'Проверка позиций сайта', link: '/checksitepositions', type: 'item', icon: IconPosition },
    { label: 'Расписание проверки позиций', link: '/analysistoschedule', type: 'item', icon: IconSchedule },
    { label: 'Кластеризация запросов', link: '/queryclustering', type: 'item', icon: IconClustering },
    { label: 'Автогенерация запросов', link: '/autoquerygeneration', type: 'item', icon: IconAuthogeneration },
];

export const RenderMenuItem = (item: MenuItem, index: number) => {

    if (item.type === 'item') {
        return (
            <div>
                <Link to={item.link} key={index} className={cls.link}>
                    <div className={cls.i}>
                        <Icon src={item.icon}/>
                        <Menu.Item className={cls.submenu__item}>{item.label}</Menu.Item>
                    </div>
                </Link>
            </div>

        );
    } else if (item.type === 'submenu') {
        return (
            <Menu.SubMenu key={index} title={item.label} className={cls.submenu}>
                {item.items.map(RenderMenuItem)}
            </Menu.SubMenu>
        );
    }
    return null;
};
