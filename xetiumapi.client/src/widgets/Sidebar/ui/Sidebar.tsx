import { FC, useState } from 'react';
import { AppLogo } from "@/shared/ui/components/AppLogo";
import {MenuItems } from "@/shared/ui/components/Menu";
import cls from "../styles/Sidebar.module.scss";
import { Layout, Menu, ConfigProvider } from "antd";
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';

interface ISidebarProps {
}

export const Sidebar: FC<ISidebarProps> = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = ({key}: { key: string }) => {
        const item = MenuItems.find(item => item.key === key);
        if (item && item.link) {
            navigate(item.link);
        }
    };

    return (
        <StyleProvider>
            <Layout className={cls.sidebar} collapsible collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                <div>
                    <AppLogo className={cls.logotype}></AppLogo>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    iconSize: '24px',
                                    subMenuItemBg: '#252525',
                                    itemSelectedBg: '#454545',
                                    itemHeight: '45px',
                                    itemHoverColor: '#fff',
                                    itemSelectedColor: '#fff',
                                    itemHoverBg: '#424242',
                                    itemActiveBg: '#313131',
                                    itemFontSize: '15px',
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
        </StyleProvider>
    );
};

