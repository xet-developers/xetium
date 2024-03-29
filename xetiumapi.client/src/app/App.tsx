import {appRouter} from './providers/router'
import {StoreProvider} from './providers/StoreProvaider'
import {Suspense} from "react";

const {AppRouter} = appRouter

const App = () => {

    return (
        <Suspense fallback={''}>
            <StoreProvider>
                <AppRouter/>
            </StoreProvider>
        </Suspense>
    );
}


export default App;
