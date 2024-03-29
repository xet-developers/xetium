import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {allRoutes} from '../../consts'
import {sharedConfigRoutes} from '@/shared/config'

const {unregisteredRoutes, registeredRoutes} = allRoutes
const {UnregisteredRoutes} = unregisteredRoutes
const {RegisteredRoutes} = registeredRoutes

//затычка!!
let isAuth = false;
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
            <Routes>
                {routesContent}
                <Route path="*" element={<Link to={'registration'}> dsadasda</Link>}/>
            </Routes>
        </BrowserRouter>
    );
}
