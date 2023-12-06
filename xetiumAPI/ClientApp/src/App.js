import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AuthContext} from "./contex/IsAuth";
import CreateRouter from "./components/CreateRouter";
import {CurrentProjectContext, UserProjectsContext} from "./contex/CurrentProject";


const App = () => {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const [isAuth, setIsAuth] = useState(false);
    const [currentProject, setCurrentProject] = useState({})
    const [userProjects, setUserProjects] = useState([])

    return (
        <UserProjectsContext.Provider value={{
            userProjects, setUserProjects
        }}>
            <CurrentProjectContext.Provider value={{
                currentProject,
                setCurrentProject
            }}>
                <AuthContext.Provider value={{
                    isAuth,
                    setIsAuth,
                }}>
                    <BrowserRouter basename={baseUrl}>
                        <CreateRouter/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </CurrentProjectContext.Provider>
        </UserProjectsContext.Provider>

    );
};


export default App;