import type { RouteObject } from "react-router-dom";
import PATH from "./path";
import PrivateLayout from "@/layouts/private-layout";
import Dashboard from "@/pages/dashboard";
import CodeStats from "@/pages/CodeStats";
import HealthPage from "@/pages/HealthPage";

export const PrivateRoute: RouteObject[] = [
  {
    path: PATH.DASHBOARD,
    element: (
      <PrivateLayout>
        <Dashboard />
      </PrivateLayout>
    ),
  },
  {
    path: PATH.STATS,
    element: (
      <PrivateLayout>
        <CodeStats />
      </PrivateLayout>
    ),
  },
  {
    path: PATH.HEALTH,
    element: (
      <PrivateLayout>
        <HealthPage />
      </PrivateLayout>
    ),
  },
  {
    path: PATH.HEALTH,
    element: (
      <PrivateLayout>
        <HealthPage />
      </PrivateLayout>
    ),
  },
];
