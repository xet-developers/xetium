import {FC, memo, Suspense, useCallback, useEffect, useState} from 'react';
import {AppLogo} from "@/shared/ui/components/AppLogo";
import {getItem, MenuItem, MenuItems} from "@/shared/ui/components/Menu";
import cls from "../styles/Sidebar.module.scss";
import {Layout, Menu, ConfigProvider} from "antd";
import type {MenuProps} from 'antd';
import {useNavigate} from 'react-router-dom';
import {StyleProvider} from '@ant-design/cssinjs';
import {CreateProject} from "@/features/CreateProject";
import {ProjectSliceActions, useGetProjectQuery} from "@/entity/Project";
import {RightOutlined} from "@ant-design/icons";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";

interface ISidebarProps {
}

export const Sidebar: FC<ISidebarProps> = memo(() => {
    //const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const {data, isLoading} = useGetProjectQuery()
    const [items, setItems] = useState(MenuItems)
    const dispatch = useAppDispatch()

    const openModal = () => {
        setIsModalVisible(true);
    };

    const onClick: MenuProps['onClick'] = useCallback(({key}: { key: string }) => {
        if (key === '3') {
            openModal();
        } else {
            const item = MenuItems.find(item => item.key === key);

            if(key.length > 3){
                dispatch(ProjectSliceActions.setCurrentProjectId(key))
            }
            if (item && item.link) {
                navigate(item.link);
            }
        }
    }, []);

    useEffect(() => {
        if (data) {
            const temp: MenuItem[] = []
            for (const project of data) {
                temp?.push(getItem(project.id, project.name, `/${project.name}`, <RightOutlined
                    style={{color: '#ffffff'}}/>))
            }

            const projects: MenuItem | undefined = items.find(item => item.key === '1')

            if (!projects) {
                return
            }

            for (const projBut of temp) {
                if (!projects.children?.find(el => el.key === projBut.key)) {
                    projects.children?.unshift(projBut)
                }
            }

            setItems([...items])
        }
    }, [data])


    return (
        <StyleProvider>
            <Suspense fallback={''}>
                <Layout className={cls.sidebar}>
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
                            {!isLoading &&
                                <Menu className={cls.menu} onClick={onClick} mode='inline' items={items}></Menu>}
                        </ConfigProvider>
                    </div>
                    <span className={cls.creators}>© ️XET Development, 2024</span>
                </Layout>
            </Suspense>
            <CreateProject open={isModalVisible} setOpen={setIsModalVisible}></CreateProject>
        </StyleProvider>
    );
});

