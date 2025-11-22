import { setAuthHeader } from "@/lib/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { loginSuccess } from "./redux/slices/auth-slice";
import { type RootState } from "./redux/store";

function ThemeInitializer() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
}

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setAuthHeader(token);

      dispatch(
        loginSuccess({
          token,
          fullName: localStorage.getItem("fullName") || null,
        })
      );
    }
  }, [dispatch]);

  return <AppRouter />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeInitializer />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
