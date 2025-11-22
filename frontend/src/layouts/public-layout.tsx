import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PATH from "@/routes/path";
import { selectIsAuthenticated } from "@/redux/selectors/auth-selector";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PublicLayout({ children }: Props) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={PATH.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
