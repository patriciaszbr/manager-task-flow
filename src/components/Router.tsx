import { Route, Routes } from "react-router-dom";
import { HHistory } from "../pages/History";
import { Home } from "../pages/Home";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<HHistory />} />
    </Routes>
  );
}
