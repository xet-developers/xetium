import React, {useState, useEffect, useContext} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Arrow from "../../images/arrowSeo.svg";
import Line from "../../images/line.svg";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js";
import {UserData} from './UserData';
import {CurrentProjectContext} from "../../contex/CurrentProject";

const API = '';

const SpaceSEO = () => {
    const [inputValue, setInputValue] = useState('');
    const [usersReq, setUsersReq] = useState([]);
    const [response, setResponse] = useState({})
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)

    const zatichka = {
        searchsystem: 1,
        positionResult: {
            qwe: 1,
            wer: 2,
            errt: 3,
            qweeq: 4
        }
    }

    const addResp = (resp) => {
        const positionResult = resp?.positionResult;
        console.log(positionResult)
        setUsersReq(usersReq.concat(positionResult))
    }

    // const fetchUsers = async (url) => {
    //     try {
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         if (data.length > 0) {
    //             setUsers(data)
    //         }
    //         console.log(data);
    //
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //
    // useEffect(() => {
    //     fetchUsers(API)
    // }, [])

    return (
        <div>
            <section className={Styles.header}>
                <div>
                    <img src={Arrow} alt="arrow" className={Styles.arrow}/>
                    <p className={Styles.headerText}>Проверка позиций</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <section>
                <div>
                    <p className={Styles.h}>Добавление ключевых слов</p>

                    <input value={inputValue} onChange={e => setInputValue(e.target.value)} id="keyWords"/>
                    <br/>
                    <label form="keyWords">Вводите запросы через запятую! До и после запятой не ставьте пробел.</label>
                    <br/>
                    <button
                        className={Styles.sendKey}
                        disabled={inputValue.length === 0}
                        type='button'
                        onClick={async () => {
                            const keyWordsArray = inputValue.trim().split(', ')
                            const res = {
                                projid: 1,
                                uri: "https://github.com",
                                keywords: keyWordsArray,
                                top: 100,
                                searchsystem: 1
                            }
                            console.log(res)
                            const params = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': "application/problem+json; charset=utf-8"
                                },
                                body: JSON.stringify(res)
                            };

                            const resp = await fetch("abc", params)
                                .catch()
                            const respJson = await resp.json();

                            if (resp.ok) {
                                addResp(respJson)
                            } else {
                                addResp(zatichka)
                            }
                        }}
                        // {
                        //     try {
                        //         const keyWordsArray = inputValue.trim().split(',');
                        //         console.log(keyWordsArray);
                        //         await axios({
                        //             url: "abc",
                        //             headers: {
                        //                 'Content-Type': "application/problem+json; charset=utf-8"
                        //             },
                        //             params: {
                        //                 field: keyWordsArray
                        //             },
                        //             method: "POST",
                        //             data: null
                        //         }).then(({ data }) => {
                        //             return data;
                        //         });
                        //     } catch (error) {
                        //         console.log(error);
                        //     }
                        // }}
                    >
                        Отправить
                    </button>

                </div>
            </section>

            <section>
                <table>
                    <thead>
                    <tr>
                        <th>Поисковая система</th>
                        <th>Запрос</th>
                        <th>Позиция</th>
                    </tr>
                    </thead>

                    <tbody>
                    <UserData users={usersReq}/>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default SpaceSEO;