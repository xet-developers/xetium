import {FC, FormEvent, useCallback} from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader.tsx";
import {
    AuthorizationFormSliceActions,
    AuthorizationFormSliceReducer
} from "../model/slice/IAuthorizationForm.slice.ts";
import {useSelector} from "react-redux";
import {getPassword, getUserName} from "../model/selectors/AuthorizationForm.selectors.ts";
import {useAuthorizationFormApi} from "@/features/AuthorizationForm/api/AuthorizationForm.api.ts";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage.ts";
import cls from "../styles/AuthorizationForm.module.scss";

import {ConfigProvider, Button, Flex, Input, Typography } from "antd";
import {initAuthData} from "@/entity/User/model/servises/initAuthData.ts";
const { Title, Link } = Typography;

interface IAuthorizationFormProps {
}

const reducers: ReducersList = {
    authorizationForm: AuthorizationFormSliceReducer,
};

export const AuthorizationForm: FC<IAuthorizationFormProps> = () => {
    const dispatch = useAppDispatch()

    const username = useSelector(getUserName)
    const password = useSelector(getPassword)

    const [updatePost, {isLoading}] = useAuthorizationFormApi()

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(AuthorizationFormSliceActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(AuthorizationFormSliceActions.setPassword(value));
        },
        [dispatch],
    );


    const onRegisterClick = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            const result = await updatePost({
                UserName: username,
                Password: password,
            }).unwrap();


            if (result) {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, result.token)
                dispatch(initAuthData())
            }
        },
        [dispatch, password, username],
    );


    return (
        <DynamicModuleLoader reducers={reducers}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F66450',
                        fontFamilyCode: 'Montserrat Alternates',
                        colorText: '#252525'
                    },
                    components: {
                        Button: {
                            defaultHoverColor: '#F66450'
                        },
                    },
                }}
            >
                <div className={cls.page}>
                    <Flex justify={"center"} align={"center"} className={cls.form}>
                        <Flex vertical={true} gap={30} justify={"center"} align={"center"}>
                            <Title level={2} style={{marginTop: '40px', fontSize: '40px', fontFamily: 'Montserrat'}}>Авторизация</Title>
                            <Flex justify={'center'} gap={5} style={{marginTop: '-40px', paddingBottom: '40px'}}>
                                <Title level={5} style={{color: '#5F5F5F', fontSize: '15px', fontFamily: 'Montserrat'}}>Еще нет аккаунта?</Title>
                                <Link href="/registration">
                                    <Title level={5} style={{color: '#F66450', fontSize: '15px', fontFamily: 'Montserrat'}} className={cls.hoverText}>
                                        Зарегистрироваться
                                    </Title>
                                </Link>
                            </Flex>

                            <Flex vertical={true} justify={'center'} gap={40}>
                                <Input onChange={(e) => onChangeUsername(e.target.value)}
                                       placeholder={'Имя пользователя или почта'} className={cls.input}/>
                                <Input onChange={(e) => onChangePassword(e.target.value)}
                                       placeholder={'Пароль'} className={cls.input}/>
                            </Flex>

                            {isLoading ? (
                                <Title level={5} style={{color: '#252525', marginTop: '10px', fontSize: '18px', fontWeight: '400', fontFamily: 'Montserrat'}}>
                                    Загрузка...
                                </Title>
                            ) : (
                                <Button type="primary" onClick={onRegisterClick} className={cls.btn}>
                                    <Title level={5} style={{color: '#fff', marginTop: '10px', fontSize: '18px', fontWeight: '400', fontFamily: 'Montserrat'}}>
                                        ПЕРЕЙТИ К ПРОЕКТАМ
                                    </Title>
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </div>
            </ConfigProvider>

        </DynamicModuleLoader>
    );
};


