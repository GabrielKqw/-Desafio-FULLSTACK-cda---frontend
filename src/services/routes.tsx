/** @format */
import StartPage from '../pages/startpage/start';
import Login from ".././pages/login/login";
import SingUp from ".././pages/register/singup";
import { useRoutes } from "react-router-dom";
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
  ]);
};

export default Router;
