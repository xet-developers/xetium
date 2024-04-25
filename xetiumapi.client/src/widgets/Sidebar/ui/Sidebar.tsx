import { FC, useState } from 'react';
import { AppLogo } from "@/shared/ui/components/AppLogo";
import {MenuItems, RenderMenuItem} from "@/shared/ui/components/Menu";
import cls from "../styles/Sidebar.module.scss";
import { Layout, Menu } from "antd";

interface ISidebarProps {
}

export const SideBar: FC<ISidebarProps> = () => {
    //const props: ISidebarProps = {}
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cls.sidebar}>
            <Layout collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <AppLogo className={cls.logotype}></AppLogo>
                <Menu>
                    {MenuItems.map(RenderMenuItem)}
                </Menu>
                <p className={cls.creators} title={'© ️XET Development, 2024'}/><p/>
            </Layout>
        </div>
    );
};


