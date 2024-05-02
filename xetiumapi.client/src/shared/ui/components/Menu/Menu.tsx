import {
    UserOutlined,
    ProductOutlined,
    PlusCircleOutlined,
    ProfileOutlined,
    FileTextOutlined,
    MonitorOutlined,
    ScheduleOutlined,
    PartitionOutlined,
    ClusterOutlined,
    RightOutlined } from '@ant-design/icons';

type MenuItem = {
    key: React.Key;
    label: string;
    link?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
};

export const MenuItems: MenuItem[] = [
    getItem('1','Личный кабинет', '/personalaccount', <UserOutlined style={{ color: '#ffffff' }}/>),
    getItem('0','Имя пространства', '/', <ProductOutlined style={{ color: '#ffffff' }}/>,[
        getItem('2','Пространство 1', '/', <RightOutlined style={{ color: '#ffffff' }}/>),
        getItem('3','Добавить пространство', '/', <PlusCircleOutlined style={{ color: '#ffffff' }}/>),
    ]),
    getItem('4','Мой проект', '/myproject', <ProfileOutlined style={{ color: '#ffffff' }}/>),
    getItem('5','Отчеты', '/reports', <FileTextOutlined style={{ color: '#ffffff' }}/>),
    getItem('6','Проверка позиций сайта', '/checksitepositions', <MonitorOutlined style={{ color: '#ffffff' }}/>),
    getItem('7','Расписание проверки позиций', '/analysistoschedule', <ScheduleOutlined style={{ color: '#ffffff' }}/>),
    getItem('8','Кластеризация запросов', '/queryclustering', <PartitionOutlined style={{ color: '#ffffff' }}/>),
    getItem('9','Автогенерация запросов', '/autoquerygeneration', <ClusterOutlined style={{ color: '#ffffff' }}/>),
];

export function getItem(
    key: React.Key,
    label: string,
    link: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        label,
        link,
        icon,
        children,
    } as MenuItem;
}
