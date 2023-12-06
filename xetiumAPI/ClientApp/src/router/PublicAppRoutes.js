import Advertising from "../pages/unregistered/Advertising";
import Authorization from "../pages/unregistered/Authorization";
import Register from "../pages/unregistered/Register";

const PublicAppRoutes = [
    {
        path: "/",
        element: <Advertising/>
    },
    {
        path: "advertising",
        element: <Advertising/>
    },
    {
        path: "register",
        element: <Register/>
    },
    {
        path: "authorization",
        element: <Authorization/>
    },
    {
        path: "*",
        element: <Advertising/>
    }
];


export default PublicAppRoutes;
