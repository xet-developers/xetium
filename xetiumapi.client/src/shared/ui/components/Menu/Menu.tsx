import {
    UserOutlined,
    ProductOutlined,
    PlusCircleOutlined,
    ProfileOutlined,
    FileTextOutlined,
    MonitorOutlined,
    ScheduleOutlined,
    PartitionOutlined,
    ClusterOutlined} from '@ant-design/icons';

export type MenuItem = {
    key: React.Key;
    label: string;
    link?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
};

export const MenuItems: MenuItem[] = [
    getItem('0','Личный кабинет', '/personalaccount', <UserOutlined style={{ color: '#ffffff' }}/>),
    getItem('1','Имя пространства', '/', <ProductOutlined style={{ color: '#ffffff' }}/>,[
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
