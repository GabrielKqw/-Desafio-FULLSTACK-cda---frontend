/** @format */
import { useRoutes } from "react-router-dom";
import StartPage from '../pages/startpage/start';
import Login from "../pages/login/login";
import SingUp from ".././pages/register/singup";
import Dashboard from ".././pages/dashboard/dashboard";
import { RoutesPath } from "../routes";

const Router = () => {
  return useRoutes([
    {
      path: RoutesPath.HOME,
      element: <StartPage />,
    },
    {
      path: RoutesPath.LOGIN,
      element: <Login />,
    },
    {
      path: RoutesPath.REGISTER,
      element: <SingUp />,
    },
    {
      path: RoutesPath.DASHBOARD,
      element: <Dashboard />,
    },
  ]);
};

export default Router;
