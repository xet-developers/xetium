import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {allRoutes} from '../../consts'
import {sharedConfigRoutes} from '@/shared/config'
import {useCallback} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entity/User";

const {unregisteredRoutes, registeredRoutes} = allRoutes
const {UnregisteredRoutes} = unregisteredRoutes
const {RegisteredRoutes} = registeredRoutes


export const AppRouter = () => {
    const authData = useSelector(getUserAuthData)

    const routes: any = useCallback(() => {
        let currentRoutes: sharedConfigRoutes.IRouteDescription[] = UnregisteredRoutes

        if (authData) {
            currentRoutes = RegisteredRoutes;
        }

         return currentRoutes.map(({path, component: Component}) => (
            <Route key={path} path={path} element={<Component/>}/>
        ))
    }, [authData]);

    return (
        <BrowserRouter>
            <Routes>
                {routes}
                <Route path="*" element={<Link to={'registration'}> dsadasda</Link>}/>
            </Routes>
        </BrowserRouter>);
}
