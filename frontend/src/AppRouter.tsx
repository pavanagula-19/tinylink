import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { PublicRoute } from "./routes/public-route";
import { PrivateRoute } from "./routes/private-route";
import PATH from "./routes/path";
import { selectToken } from "./redux/selectors/auth-selector";

const AppRouter = () => {
  const reduxToken = useSelector(selectToken);
  const token = reduxToken || localStorage.getItem("auth_token");

  const privateRoutes = PrivateRoute.map((route) => ({
    ...route,
    element: token ? route.element : <Navigate to={PATH.LANDING} replace />,
  }));

  const routes = [...PublicRoute, ...privateRoutes];

  return useRoutes(routes);
};

export default AppRouter;
