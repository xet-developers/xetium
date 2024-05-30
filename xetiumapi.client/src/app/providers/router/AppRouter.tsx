import {Suspense, useMemo} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {allRoutes} from '../../consts';
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entity/User";
import {RegisteredLayout} from "@/shared/layouts/RegisteredLayout/RegisteredLayout.tsx";
import {Header} from "@/features/Header";
import {Sidebar} from "@/widgets/Sidebar/ui/Sidebar.tsx";

const {unregisteredRoutes, registeredRoutes} = allRoutes
const {UnregisteredRoutes} = unregisteredRoutes
const {RegisteredRoutes} = registeredRoutes


const a = UnregisteredRoutes.map(({path, component: Component}) => (
    <Route key={path} path={path} element={<Component/>}/>
))

const b = RegisteredRoutes.map(({path, component: Component}) => (
    <Route key={path} path={path} element={<Component/>}/>
))

export const AppRouter = () => {
    const authData = useSelector(getUserAuthData)


    const routes = useMemo(() => {
        console.log(authData)
        if (authData) {
            return (
                <RegisteredLayout
                header={<Header/>}
                navMenu={<Sidebar/>}
                content={<Routes>{b}</Routes>}>
            </RegisteredLayout>)
        }

        return (<Routes>{a}</Routes>)
    }, [authData]);


    return (
        <BrowserRouter>
            <Suspense fallback={''}>
                {routes}
            </Suspense>
        </BrowserRouter>
    )
};
