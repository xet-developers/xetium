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
    getPassword, getSecondPassword,
//    getSecondPassword,
} from "../model/selectors/registerFormSelectors.ts";
import {useRegisterFormApi} from "../api/registerForm.api.ts";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage.ts";
import {ConfigProvider, Button, Flex, Input, Typography, Checkbox} from "antd";

const {Title, Link} = Typography;
import cls from "@/features/RegisterForm/styles/RegisterForm.module.scss";
import {initAuthData} from "@/entity/User/model/servises/initAuthData.ts";
import {UserValidator} from "@/shared/lib/validator/user/userLogin.ts";

const reducers: ReducersList = {
    registerForm: registerFormReducer,
};

export interface IRegisterFormProps {
    onSuccess: () => void;
}

export const RegisterForm: FC<IRegisterFormProps> = memo(() => {

    const dispatch = useAppDispatch()
    const username: string = useSelector(getName);
    const password: string = useSelector(getPassword);
    const secPassword: string = useSelector(getSecondPassword);
    const email: string = useSelector(getEmail);
    const acceptPersonalData = useSelector(getAcceptPersonalData);
    const acceptConfPolitics = useSelector(getAcceptConfPolitics);
    const acceptSpam = useSelector(getAcceptSpam);
    const [updatePost, {isLoading}] = useRegisterFormApi();

    const [validateUserName, setValidateUserName] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);
    const [validateRepeatPassword, setValidateRepeatPassword] = useState(false);
    const [validateCheckboxData, setValidateCheckboxData] = useState(false);
    const [validateCheckboxConf, setValidateCheckboxConf] = useState(false);

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
            console.log(secPassword)
        },
        [dispatch],
    );

    const onChangeSpamCheckbox = useCallback(
        () => {
            dispatch(registerFormActions.setSpamCheckbox(!acceptSpam));
        },
        [dispatch, acceptSpam],
    );

    const onAcceptPersonalDataCheckbox = useCallback(
        () => {
            dispatch(registerFormActions.setAcceptPersonalDataCheckbox(!acceptPersonalData));
        },
        [dispatch, acceptPersonalData],
    );

    const onAcceptConfPoliticsCheckbox = useCallback(
        () => {
            dispatch(registerFormActions.setAcceptConfPoliticsCheckbox(!acceptConfPolitics));
        },
        [dispatch, acceptConfPolitics],
    );

    const onRegisterClick = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                if (validate()) {
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
                        dispatch(initAuthData())
                    }
                }
            } catch (e) {
                if (secPassword.length === 0) {
                    setValidateRepeatPassword(true);
                }
            }
        },
        [dispatch, password, secPassword, username, email, acceptPersonalData, acceptConfPolitics, acceptSpam],
    );

    function validate() {
        let un = UserValidator.validateUserName(username);
        let em = UserValidator.validateEmail(email);
        let pass = UserValidator.validatePassword(password);
        let rep = UserValidator.validateRepeatPassword(password, secPassword);

        setValidateUserName(!un);
        setValidateEmail(!em);
        setValidatePassword(!pass);
        setValidateRepeatPassword(!rep);
        setValidateCheckboxData(!acceptPersonalData);
        setValidateCheckboxConf(!acceptConfPolitics);

        return un && em && pass && validateRepeatPassword && acceptPersonalData && acceptConfPolitics;
    }

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
                    <Flex align={"center"} className={cls.formRight}>
                        <Flex gap={5} align={'space-between'}>
                            <Flex vertical={true} gap={5} align={'center'} className={cls.formLeft}>
                                <Title level={2} style={{
                                    marginTop: '60px',
                                    fontSize: '40px',
                                    fontFamily: 'Montserrat'
                                }}>Регистрация</Title>
                                <Flex justify={'center'} gap={5} style={{marginTop: '-20px', paddingBottom: '40px'}}>
                                    <Title level={5}
                                           style={{color: '#5F5F5F', fontSize: '15px', fontFamily: 'Montserrat'}}>Уже
                                        есть аккаунт?</Title>
                                    <Link href="/authorization">
                                        <Title level={5}
                                               style={{color: '#F66450', fontSize: '15px', fontFamily: 'Montserrat'}}
                                               className={cls.hoverText}>
                                            Войти
                                        </Title>
                                    </Link>
                                </Flex>

                                <Flex vertical={true} justify={'center'} gap={40}>
                                    <Input onChange={(e) => onChangeUsername(e.target.value)}
                                           placeholder={'Имя пользователя'} className={cls.input}/>

                                    {
                                        validateUserName &&
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'rgb(246, 100, 80)',
                                            width: '500px',
                                            marginTop: '-2em',
                                            marginBottom: '-2em'
                                        }}>
                                            Имя пользователя может содержать только латинские буквы и иметь длину от 5 до 20
                                            символов!
                                        </span>
                                    }

                                    <Input onChange={(e) => onChangeEmail(e.target.value)}
                                           placeholder={'Почта'} className={cls.input}/>

                                    {
                                        validateEmail &&
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'rgb(246, 100, 80)',
                                            marginTop: '-2em',
                                            marginBottom: '-2em'
                                        }}>
                                            Почта должна содержать домен, например, example@mail.ru!
                                        </span>
                                    }

                                    <Input onChange={(e) => onChangePassword(e.target.value)}
                                           placeholder={'Пароль'} className={cls.input}/>

                                    {
                                        validatePassword &&
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'rgb(246, 100, 80)',
                                            width: '500px',
                                            marginTop: '-2em',
                                            marginBottom: '-2em'
                                        }}>
                                            Пароль должен состоять содержать заглавную букву, цифру и иметь длину не менее 6
                                            символов!
                                        </span>
                                    }

                                    <Input onChange={(e) => onChangeSecondPassword(e.target.value)}
                                           placeholder={'Повторите пароль'} className={cls.input}/>

                                    {
                                        validateRepeatPassword &&
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'rgb(246, 100, 80)',
                                            marginTop: '-2em',
                                            marginBottom: '-2em'
                                        }}>
                                            Пароли не совпадают!
                                        </span>
                                    }
                                </Flex>

                                {isLoading ? (
                                    <Title level={5} style={{
                                        color: '#252525',
                                        marginTop: '60px',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                        fontFamily: 'Montserrat'
                                    }}>
                                        Загрузка...
                                    </Title>
                                ) : (
                                    <Button type="primary" onClick={onRegisterClick} className={cls.btn}>
                                        <Title level={5} style={{
                                            color: '#fff',
                                            marginTop: '10px',
                                            fontSize: '18px',
                                            fontWeight: '400',
                                            fontFamily: 'Montserrat'
                                        }}>
                                            ЗАРЕГИСТРИРОВАТЬСЯ
                                        </Title>
                                    </Button>
                                )}
                            </Flex>


                            <Flex vertical={true} align={'start'} style={{marginLeft: '10px', marginTop: '200px'}}
                                  gap={40}>
                                <Flex justify={'center'} gap={10}>
                                    <Checkbox
                                        value={acceptPersonalData}
                                        onChange={() => {
                                            onAcceptPersonalDataCheckbox()
                                        }}>
                                    </Checkbox>

                                    <Title level={5} style={{
                                        color: '#252525', fontSize: '13px', fontWeight: '400',
                                        fontFamily: 'Montserrat'
                                    }}>
                                        Даю свое согласие на обработку персональных данных
                                    </Title>
                                </Flex>

                                {
                                    validateCheckboxData &&
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'rgb(246, 100, 80)',
                                        marginTop: '-2em',
                                        marginBottom: '-1em'
                                    }}>
                                        Необходимо поставить флажок!
                                    </span>
                                }

                                <Flex justify={'center'} gap={10}>
                                    <Checkbox
                                        value={acceptConfPolitics}
                                        onChange={() => {
                                            onAcceptConfPoliticsCheckbox()
                                        }}></Checkbox>
                                    <Title level={5} style={{
                                        color: '#252525', fontSize: '13px', fontWeight: '400',
                                        fontFamily: 'Montserrat'
                                    }}>
                                        Согласен с условиями пользования и политикой конфиденциальности
                                    </Title>
                                </Flex>

                                {
                                    validateCheckboxConf &&
                                    <p style={{
                                        fontSize: '12px',
                                        color: 'rgb(246, 100, 80)',
                                        marginTop: '-2em',
                                        marginBottom: '-1em'
                                    }}>
                                        Необходимо поставить флажок!
                                    </p>
                                }

                                <Flex justify={'center'} align={'center'} gap={10}>
                                    <Checkbox
                                        value={acceptSpam}
                                        onChange={() => {
                                            onChangeSpamCheckbox()
                                        }}></Checkbox>
                                    <Title level={5} style={{
                                        color: '#252525', fontSize: '13px', fontWeight: '400',
                                        fontFamily: 'Montserrat'
                                    }}>
                                        Даю свое согласие на получение информационной рассылки
                                    </Title>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </div>
            </ConfigProvider>
        </DynamicModuleLoader>
    );
})

