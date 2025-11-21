import type { RouteObject } from "react-router-dom";
import PATH from "./path";
import { PublicLayout } from "@/layouts/public-layout";
import Register from "@/pages/register";
import Login from "@/pages/login";
import Landing from "@/pages/Landing";

export const PublicRoute: RouteObject[] = [
  {
    index: true,
    path: PATH.SIGNUP,
    element: (
      <PublicLayout>
        <Register />
      </PublicLayout>
    ),
  },
  {
    index: true,
    path: PATH.LOGIN,
    element: (
      <PublicLayout>
        <Login />
      </PublicLayout>
    ),
  },
  {
    index: true,
    path: PATH.LANDING_PAGE,
    element: (
      <PublicLayout>
        <Landing />
      </PublicLayout>
    ),
  },
];
