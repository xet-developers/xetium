import React, { useMemo, useEffect } from 'react';
import {BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import {allRoutes} from '../../consts';
import {sharedConfigRoutes} from '@/shared/config';
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entity/User";
import { HeaderContext } from '@/app/consts/routes/HeaderContext';

const {unregisteredRoutes, registeredRoutes} = allRoutes
const {UnregisteredRoutes} = unregisteredRoutes
const {RegisteredRoutes} = registeredRoutes


export const AppRouter = () => {

    const [headerName, setHeaderName] = React.useState('');

    const location = useLocation();

    useEffect(() => {
        handlePathChange(location.pathname);
    }, [location]);

    const handlePathChange = (path: any) => {
        switch (path) {
            case '/analysistoschedule':
                setHeaderName('Расписание проверки позиций');
                break;
            default:
                setHeaderName('');
        }
    };

    const authData = useSelector(getUserAuthData)

    const routes = useMemo(() => {
        let currentRoutes: sharedConfigRoutes.IRouteDescription[] = UnregisteredRoutes

        if (true) {
            currentRoutes = RegisteredRoutes;
        }


        return currentRoutes.map(({path, component: Component}) => (
            <Route key={path} path={path} element={<Component />}/>
        ))
    }, [authData]);


    return (
        <HeaderContext.Provider value={{ headerName }}>
            <BrowserRouter>
                <Routes>
                    {routes}
                    <Route path="*" element={<Link to={'registration'} > dsadasda</Link>}/>
                </Routes>
            </BrowserRouter>);
        </HeaderContext.Provider>)
};
