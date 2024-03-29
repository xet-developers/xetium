import {InputField} from '@/shared/ui/components/InputField'
import {FC, memo, useCallback} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {registerFormActions, registerFormReducer,} from "@/features/RegisterForm";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader.tsx";

const reducers: ReducersList = {
    registerForm: registerFormReducer,
};

export interface IRegisterFormProps {

}

export const RegisterForm: FC<IRegisterFormProps> = memo(() => {
    const dispatch = useAppDispatch()

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

    // const onChangeSpamCheckbox = useCallback(
    //     (value: boolean) => {
    //         dispatch(registerFormActions.setSpamCheckbox(value));
    //     },
    //     [dispatch],
    // );
    //
    // const onAcceptPersonalDataCheckbox = useCallback(
    //     (value: boolean) => {
    //         dispatch(registerFormActions.setAcceptPersonalDataCheckbox(value));
    //     },
    //     [dispatch],
    // );
    //
    // const onAcceptConfPoliticsCheckbox = useCallback(
    //     (value: boolean) => {
    //         dispatch(registerFormActions.setAcceptConfPoliticsCheckbox(value));
    //     },
    //     [dispatch],
    // );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <InputField errorText={'почта должна быть - лялялял'}
                        onChange={(value: string) => onChangeUsername(value)}
                        isCorrect={() => false}
                        label={'Имя'}
                        placeholder={'введите Имя'}/>

            <InputField errorText={'имя должна быть - лялялял'}
                        onChange={(value: string) => onChangeEmail(value)}
                        isCorrect={() => false}
                        label={'Почта'}
                        placeholder={'введите почту'}/>

            <InputField errorText={'почта должна быть - лялялял'}
                        onChange={(value: string) => onChangePassword(value)}
                        isCorrect={() => false}
                        label={'Пароль'}
                        placeholder={'введите пароль'}/>

            <InputField errorText={'пароли не совпадают'}
                        onChange={(value: string) => onChangeSecondPassword(value)}
                        isCorrect={() => false}
                        label={'Повторите пароль'}
                        placeholder={'Повторите пароль'}/>
        </DynamicModuleLoader>
    );
})
