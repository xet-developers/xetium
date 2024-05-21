import {appRouter} from './providers/router'
import {Suspense, useEffect} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {initAuthData} from "@/entity/User/model/servises/initAuthData.ts";


const {AppRouter} = appRouter

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAuthData())
    }, []);

    return (
        <Suspense fallback={''}>
            <AppRouter/>
        </Suspense>
    );
}


export default App;
