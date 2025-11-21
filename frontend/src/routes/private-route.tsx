import type { RouteObject } from "react-router-dom";
import PATH from "./path";
import PrivateLayout from "@/layouts/private-layout";
import Dashboard from "@/pages/dashboard";
import StatsPage from "@/pages/stats-page";

export const PrivateRoute: RouteObject[] = [
  {
    index: true,
    path: PATH.DASHBOARD,
    element: (
      <PrivateLayout>
        <Dashboard />
      </PrivateLayout>
    ),
  },
  {
    index: true,
    path: PATH.STATS_PAGE,
    element: (
      <PrivateLayout>
        <StatsPage />
      </PrivateLayout>
    ),
  },
];
