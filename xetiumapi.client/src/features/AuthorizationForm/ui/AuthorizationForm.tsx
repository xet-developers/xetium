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

import {Button, Flex, Input} from "antd";
import {StyleProvider} from '@ant-design/cssinjs';

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
                localStorage.setItem(USER_LOCALSTORAGE_KEY, result)
            }
        },
        [dispatch, password, username],
    );


    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex justify={'center'} align={"center"}>
                <Flex vertical={true} justify={'center'} gap={5}>
                    <Input onChange={(value: string) => onChangeUsername(value)}
                           placeholder={'введите Имя'}/>
                    <Input onChange={(value: string) => onChangePassword(value)}
                           placeholder={'введите пароль'}/>

                    <Button onClick={onRegisterClick}>Регистрация</Button>
                    {isLoading && <p>Loading...</p>}
                </Flex>
            </Flex>
        </DynamicModuleLoader>
    );
};


