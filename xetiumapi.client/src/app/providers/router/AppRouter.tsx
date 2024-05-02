import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {allRoutes} from '../../consts'
import {sharedConfigRoutes} from '@/shared/config'
import {SideBar} from "@/widgets/Sidebar/ui/Sidebar.tsx";
import cls from "./AppRouter.module.scss";

const {unregisteredRoutes, registeredRoutes} = allRoutes
const {UnregisteredRoutes} = unregisteredRoutes
const {RegisteredRoutes} = registeredRoutes

//затычка!!
let isAuth = true;
let currentRoutes: sharedConfigRoutes.IRouteDescription[] = UnregisteredRoutes
if (isAuth)
    currentRoutes = RegisteredRoutes;
//

const routesContent = currentRoutes.map(({path, component: Component}) => (
    <Route key={path} path={path} element={<Component/>}/>
));

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <div className={cls.appRouter}>
                <SideBar></SideBar>
                <Routes>
                    {routesContent}
                    <Route path="*" element={<Link to={'registration'}> dsadasda</Link>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
