import { FC, useState } from 'react';
import { AppLogo } from "@/shared/ui/components/AppLogo";
import {MenuItems } from "@/shared/ui/components/Menu";
import cls from "../styles/Sidebar.module.scss";
import { Layout, Menu, ConfigProvider } from "antd";
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import {CreateProject} from "@/features/CreateProject/ui/CreateProject.tsx";

interface ISidebarProps {
}

export const Sidebar: FC<ISidebarProps> = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalVisible(true);
    };

    const onClick: MenuProps['onClick'] = ({key}: { key: string }) => {
        if (key === '3') {
            openModal();
        } else {
            const item = MenuItems.find(item => item.key === key);
            if (item && item.link) {
                navigate(item.link);
            }
        }
    };

    return (
        <StyleProvider>
            <Layout className={cls.sidebar} collapsed={collapsed}
                    onCollapse={(value: boolean | ((prevState: boolean) => boolean)) => setCollapsed(value)}>
                <div>
                    <AppLogo className={cls.logotype}></AppLogo>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    iconSize: 24,
                                    subMenuItemBg: '#252525',
                                    itemSelectedBg: '#454545',
                                    itemHeight: 45,
                                    itemHoverColor: '#fff',
                                    itemSelectedColor: '#fff',
                                    itemHoverBg: '#424242',
                                    itemActiveBg: '#313131',
                                    fontSize: 14,
                                    colorPrimary: '#fff',
                                    itemColor: '#fff'
                                },
                            }
                        }}
                    >
                        <Menu className={cls.menu} onClick={onClick} mode='inline' items={MenuItems}></Menu>
                    </ConfigProvider>
                </div>
                <span className={cls.creators}>© ️XET Development, 2024</span>
            </Layout>
            <CreateProject open={isModalVisible} setOpen={setIsModalVisible}></CreateProject>
        </StyleProvider>
    );
};

