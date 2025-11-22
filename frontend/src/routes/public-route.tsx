import type { RouteObject } from "react-router-dom";
import PATH from "./path";
import { PublicLayout } from "@/layouts/public-layout";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Landing from "@/pages/Landing";

export const PublicRoute: RouteObject[] = [
  {
    path: PATH.LANDING,
    element: (
      <PublicLayout>
        <Landing />
      </PublicLayout>
    ),
  },
  {
    path: PATH.LOGIN,
    element: (
      <PublicLayout>
        <Login />
      </PublicLayout>
    ),
  },
  {
    path: PATH.SIGNUP,
    element: (
      <PublicLayout>
        <Register />
      </PublicLayout>
    ),
  },
];
