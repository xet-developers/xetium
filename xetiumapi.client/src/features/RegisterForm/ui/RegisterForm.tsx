import {Input} from '@/shared/ui/components/Input/Input.tsx'
import {FC, FormEvent, memo, useCallback, useState} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {registerFormActions, registerFormReducer,} from "@/features/RegisterForm";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader.tsx";
import {useSelector} from 'react-redux';
import {
    getAcceptConfPolitics,
    getAcceptPersonalData, getAcceptSpam,
    getEmail,
    getName,
    getPassword,
//    getSecondPassword,
} from "../model/selectors/registerFormSelectors.ts";
import {useRegisterFormApi} from "@/features/RegisterForm/api/registerForm.api.ts";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage.ts";

const reducers: ReducersList = {
    registerForm: registerFormReducer,
};

export interface IRegisterFormProps {
    onSuccess: () => void;
}


export const RegisterForm: FC<IRegisterFormProps> = memo(()=> {
    //const {onSuccess}: IRegisterFormProps = props
    const dispatch = useAppDispatch()
    const username = useSelector(getName);
    const password = useSelector(getPassword);
    //const secPassword = useSelector(getSecondPassword);
    const email = useSelector(getEmail);
    const acceptPersonalData = useSelector(getAcceptPersonalData);
    const acceptConfPolitics = useSelector(getAcceptConfPolitics);
    const acceptSpam = useSelector(getAcceptSpam);
    const [updatePost, {isLoading}] = useRegisterFormApi()

    const [spamCheckboxChecked, setSpamCheckboxChecked] = useState<boolean>(false)
    const [acceptConfPoliticsChecked, setAcceptConfPoliticsChecked] = useState<boolean>(false)
    const [acceptPersonalDataChecked, setAcceptPersonalDataChecked] = useState<boolean>(false)

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(registerFormActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(registerFormActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerFormActions.setPassword(value));
        },
        [dispatch],
    );

    const onChangeSecondPassword = useCallback(
        (value: string) => {
            dispatch(registerFormActions.setSecondPassword(value));
        },
        [dispatch],
    );

    const onChangeSpamCheckbox = useCallback(
        () => {
            setSpamCheckboxChecked(!spamCheckboxChecked)
            dispatch(registerFormActions.setSpamCheckbox(spamCheckboxChecked));
        },
        [dispatch],
    );

    const onAcceptPersonalDataCheckbox = useCallback(
        () => {
            setAcceptConfPoliticsChecked(!acceptPersonalDataChecked)
            dispatch(registerFormActions.setAcceptPersonalDataCheckbox(acceptPersonalDataChecked));
        },
        [dispatch],
    );

    const onAcceptConfPoliticsCheckbox = useCallback(
        () => {
            setAcceptPersonalDataChecked(!acceptConfPoliticsChecked)
            dispatch(registerFormActions.setAcceptConfPoliticsCheckbox(acceptConfPoliticsChecked));
        },
        [dispatch],
    );

    const onRegisterClick = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                const result = await updatePost({
                    name: username,
                    username: username,
                    email: email,
                    password: password,
                    checkboxData: acceptPersonalData,
                    checkboxConf: acceptConfPolitics,
                    checkboxSpam: acceptSpam
                }).unwrap();

                if (result) {
                    localStorage.setItem(USER_LOCALSTORAGE_KEY, result.token)
                }
            }
            catch (e){
                console.log(e)
            }
        },
        [dispatch, password, username, email],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Input onChange={(value: string) => onChangeUsername(value)}
                   placeholder={'введите Имя'}/>
            <Input onChange={(value: string) => onChangeEmail(value)}
                   placeholder={'введите почту'}/>
            <Input onChange={(value: string) => onChangePassword(value)}
                   placeholder={'введите пароль'}/>
            <Input onChange={(value: string) => onChangeSecondPassword(value)}
                   placeholder={'Повторите пароль'}/>

            <Input type={'checkbox'}
                   checked={spamCheckboxChecked}
                   onChange={() => {
                       onChangeSpamCheckbox()
                   }}/>
            <Input type={'checkbox'}
                   checked={acceptPersonalDataChecked}
                   onChange={() => {
                       onAcceptPersonalDataCheckbox()
                   }}/>
            <Input type={'checkbox'}
                   checked={acceptConfPoliticsChecked}
                   onChange={() => {
                       onAcceptConfPoliticsCheckbox()
                   }}/>

            <button onClick={onRegisterClick}>Регистрация</button>
            {isLoading && <p>Loading...</p>}
        </DynamicModuleLoader>
    );
})

