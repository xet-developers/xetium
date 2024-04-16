import { FC } from 'react';
import { Sidebar, Menu} from "react-pro-sidebar";
import { AppLogo } from "@/shared/ui/components/AppLogo";
import {MenuItems, RenderMenuItem} from "@/shared/ui/components/Menu";
import {Text} from "@/shared/ui/components/Text";
import cls from "../styles/Sidebar.module.scss";
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledBackdrop.d.ts';
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledExpandIcon.d.ts';
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledMenuIcon.d.ts';
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledMenuLabel.d.ts';
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledMenuPrefix.d.ts';
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledMenuSuffix.d.ts';
import '../../../../node_modules/react-pro-sidebar/dist/styles/StyledUl.d.ts';

interface ISidebarProps {
}

export const SideBar: FC<ISidebarProps> = () => {
    //const props: ISidebarProps = {}

    return (
        <div className={cls.sidebar}>
            <Sidebar>
                <AppLogo className={cls.logotype}></AppLogo>
                <Menu className={cls.menu}>
                    {MenuItems.map(RenderMenuItem)}
                </Menu>
                <Text className={cls.creators} title={'© ️XET Development, 2024'}/><Text/>
            </Sidebar>
        </div>
    );
};


