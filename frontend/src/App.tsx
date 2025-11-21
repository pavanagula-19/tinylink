import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "sonner";
import Dashboard from "./pages/dashboard";
import StatsPage from "./pages/stats-page";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/code/:code" element={<StatsPage />} />
      </Routes>
      <Toaster richColors closeButton position="top-right" />
    </BrowserRouter>
  );
}
