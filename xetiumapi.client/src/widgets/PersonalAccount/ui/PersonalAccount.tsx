import cls from "./PersonalAccount.module.scss";
import { ConfigProvider, Flex} from "antd";
import {LogoutOutlined} from '@ant-design/icons';
import {UserPhoto} from "@/features/UserPhoto/UserPhoto.tsx";
import {UserData} from "@/features/UserData/UserData.tsx";
import {useGetUserDataQuery,  useUpdateUserMutation} from "@/entity/User";
import {useState} from "react";
import dayjs from "dayjs";
import {USER_CURRENT_PROJECT_ID, USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage.ts";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {UserSliceActions} from "@/entity/User/model/slice/User.slice.ts";

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
}


export const PersonalAccount = () => {
    const {data: user} = useGetUserDataQuery()
    const [trigger] = useUpdateUserMutation()

    const dispatch = useAppDispatch()

    const [fields, setFields] = useState<FieldData[]>([
        {name: ['username'], value: user?.userName},
        {name: ['email'], value: user?.mail},
        {name: ['date'], value: dayjs(user?.dateTime).format('MM-DD-YYYY')},
        {name: ['password'], value: '********'}
    ]);

    const logout = async () => {
        try {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
            localStorage.removeItem(USER_CURRENT_PROJECT_ID)

            dispatch(UserSliceActions.setAuthData(null))
        } catch (error) {
        }
    }

    const updateUser = async () => {
        let name = fields[0].value
        let email = fields[1].value

        await trigger({
            userName: name,
            mail: email
        })
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ffffff',
                    colorText: '#252525'
                },
                components: {
                    Button: {
                        defaultBorderColor: 'none',
                        defaultActiveBorderColor: 'none',
                        defaultHoverBorderColor: 'none',
                        textHoverBg: 'none',
                        defaultActiveBg: '#ff664e',
                        defaultHoverBg: '#ff664e'
                    }
                }
            }}
        >
            <div>
                <div className={cls.container}>
                    <UserPhoto/>
                    <UserData fields={fields} onChange={setFields}/>
                </div>
                <Flex vertical={false} gap={'4em'}>
                    <button className={cls.btnOk} onClick={updateUser}>
                        Сохранить изменения
                    </button>
                    <button className={cls.btnLogout} onClick={logout}>
                        <LogoutOutlined/>
                        Выйти
                    </button>
                </Flex>

            </div>
        </ConfigProvider>
    );
};


