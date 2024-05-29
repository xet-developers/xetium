import cls from "./PersonalAccount.module.scss";
import { Button, ConfigProvider } from "antd";
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
                    DatePicker: {
                        activeBorderColor: '#F66450'
                    },
                    Button: {
                        textHoverBg: '#ba4c3b',
                        defaultActiveBg: '#ba4c3b'
                    }
                }
            }}
        >
            <div>
                <div className={cls.container}>
                    <UserPhoto/>
                    <UserData/>
                </div>
                <Button>
                    Сохранить изменения
                </Button>
                <Button>
                    <LogoutOutlined />
                    Выйти
                </Button>
            </div>
        </ConfigProvider>
    );
};


