import cls from "./PersonalAccount.module.scss";
import {Button, ConfigProvider, Flex} from "antd";
import {LogoutOutlined} from '@ant-design/icons';
import {UserPhoto} from "@/features/UserPhoto/UserPhoto.tsx";
import {UserData} from "@/features/UserData/UserData.tsx";
import {useGetUserDataQuery, useUpdateUserMutation} from "@/entity/User";
import {useState} from "react";
import dayjs from "dayjs";

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
}


export const PersonalAccount = () => {
    const {data: user} = useGetUserDataQuery()
    const [trigger] = useUpdateUserMutation()

    const [fields, setFields] = useState<FieldData[]>([
        {name: ['username'], value: user?.userName},
        {name: ['email'], value: user?.mail},
        {name: ['date'], value: dayjs(user?.dateTime).format('MM-DD-YYYY')},
        {name: ['password'], value: '********'}
    ]);

    const logout = () => {

    }

    const updateUser = async () => {
        let name = fields[0].value
        let email = fields[1].value

        const a = await trigger({
            userName: name,
            mail: email
        })

        console.log(await a)
    }


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
                    <UserData fields={fields} onChange={setFields}/>
                </div>
                <Flex vertical={false}>
                    <Button className={cls.btnOk} onClick={updateUser}>
                        СОХРАНИТЬ ИЗМЕНЕНИЯ
                    </Button>
                    <Button className={cls.btnLogout}>
                        <LogoutOutlined/>
                        ВЫЙТИ
                    </Button>
                </Flex>

            </div>
        </ConfigProvider>
    );
};


