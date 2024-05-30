import cls from "./PersonalAccount.module.scss";
import { Button, ConfigProvider, Flex } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import {UserPhoto} from "@/features/UserPhoto/UserPhoto.tsx";
import {UserData} from "@/features/UserData/UserData.tsx";

export const PersonalAccount = () => {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F66450',
                    colorText: '#252525'
                },
                components: {
                    Button: {
                        defaultBorderColor: 'none',
                        defaultActiveBorderColor: 'none',
                        textHoverBg: 'none',
                        defaultActiveBg: '#fff',
                        defaultHoverBg: '#fff'
                    }
                }
            }}
        >
            <div>
                <div className={cls.container}>
                    <UserPhoto/>
                    <UserData/>
                </div>
                <Flex vertical={false}>
                    <Button className={cls.btnOk} >
                        СОХРАНИТЬ ИЗМЕНЕНИЯ
                    </Button>
                    <Button className={cls.btnLogout}>
                        <LogoutOutlined />
                        ВЫЙТИ
                    </Button>
                </Flex>

            </div>
        </ConfigProvider>
    );
};


