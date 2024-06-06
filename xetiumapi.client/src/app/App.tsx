import {appRouter} from './providers/router'
import {Suspense, useEffect} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {initAuthData} from "@/entity/User/model/servises/initAuthData.ts";
import {getInitializedUser} from "@/entity/User";
import {useSelector} from "react-redux";


const {AppRouter} = appRouter

const App = () => {
    const dispatch = useAppDispatch()
    const initialized = useSelector(getInitializedUser)

    useEffect(() => {
        dispatch(initAuthData())
    }, []);

    return (
        <Suspense fallback={''}>
            {initialized && <AppRouter/>}
        </Suspense>
    );
}


export default App;
