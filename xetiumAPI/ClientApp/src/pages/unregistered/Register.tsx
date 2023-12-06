// @ts-ignore
import React, {useContext} from "react";
import '../../styles/Register-authentication.css';
import {AuthContext} from "../../contex/IsAuth";
import {IRegisterRequestData, RegisterAPI} from "../../components/API/RegisterAPI";

const Register = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    return (
        <div>
            <form className="register-Field" name = 'registerForm' onSubmit={sendData}>
                <div className="register-Field-left">
                    <div className="register-Field-left-header">
                        <h1>Регистрация</h1>
                        <p>Уже есть аккаунт? <a href="#">Войти</a></p>
                    </div>

                    <input placeholder="Имя пользователя" type="text" maxLength= {20} name="name"
                           pattern="[A-Za-z]{5,20}"
                           title="Минимум 5 символов" required/>

                    <input placeholder="Е-mail" type="email" name="email"
                           pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required/>

                    <input placeholder="Пароль" type="password" id="password" name="password" minLength={8}
                           maxLength={6}

                           title="Длина от 8 до 16 символов, должна быть заглавная буква и спец.символ" required/>

                    <input placeholder="Повторите пароль" type="password" id="secpass" name="secpassword" minLength={8}
                           maxLength={16}
                           title="Пароли не совпадают" required/>

                    <input type="submit" id="register-button" value="Зарегистрироваться"/>
                </div>

                <div className="register-Field-right">
                    <div>
                        <input type="checkbox" id="checkboxData" name="checkboxData" required/>
                        <label htmlFor="checkboxData">Даю свое согласие на обработку персональных данных</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkboxConf" name="checkboxConf" required/>
                        <label htmlFor="checkboxConf">Согласен с условиями пользования и политикой
                            конфиденциальности</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkboxSpam" name="checkboxSpam"/>
                        <label htmlFor="checkboxSpam">Хочу получать вашу информационную рассылку</label>
                    </div>
                </div>
            </form>
        </div>)

    async function sendData() {
        const form = document.forms.namedItem("registerForm")
        const formData:FormData = new FormData(form)

        form.addEventListener('submit', event => {
            event.preventDefault()
        })

        const res : IRegisterRequestData = {
            name:  formData.get("name").toString(),
            email: formData.get("email").toString(),
            password: formData.get("password").toString(),
            checkboxData: !!formData.get("checkboxData"),
            checkboxConf: !!formData.get("checkboxConf"),
            checkboxSpam: !!formData.get("checkboxSpam")
        }

        const RefAPI = new RegisterAPI('/register')
        RefAPI.Send(res)

        setIsAuth(true);
        console.log(res)
    }
};

export default Register;