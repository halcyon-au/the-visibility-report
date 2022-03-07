import { BrowserRouter, Routes, Route } from "react-router-dom";
import Country from "./pages/Country";
import Landing from "./pages/Landing"
import Site from "./pages/Site";

// Todo: nice page nav animation (fade)
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/country" element={<Country />} />
        <Route path="/site" element={<Site />} />
      </Routes>
    </BrowserRouter>
  )
}