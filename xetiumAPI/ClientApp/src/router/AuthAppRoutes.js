import QueryClustering from "../pages/registered/QueryClustering";
import Report from "../pages/registered/Report";
import SitePosition from "../pages/registered/SitePosition";
import Tutorial from "../components/Tutorial";
import CurrentProject from "../pages/registered/CurrentProject";


const AuthAppRoutes = [
    {
        path: "currentproject",
        element: <CurrentProject/>
    },
    {
        path: "queryclustering",
        element: <QueryClustering/>
    },
    {
        path: "tutorial",
        element: <Tutorial/>
    },
    {
        path: "report",
        element: <Report/>
    },
    {
        path: "siteposition",
        element: <SitePosition/>
    },
    {
        path: "*",
        element: <CurrentProject/>
    }
    // {
    //     index:true,
    //     element: <Advertising />
    // }, ???
];

export default AuthAppRoutes;
