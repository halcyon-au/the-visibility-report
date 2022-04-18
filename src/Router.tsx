import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesRanked from "./pages/CountriesRanked";
import Country from "./pages/Country";
import IndividualCountry from "./pages/IndividualCountry";
import Landing from "./pages/Landing";
import Site from "./pages/Site";
import Website from "./pages/Website";

// Todo: nice page nav animation (fade)
export default function Router() {
  return (
    <BrowserRouter basename={import.meta.env.MODE === "production" ? "/the-visibility-report/" : undefined}>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/country" element={<Country />} />
        <Route path="/country/:country" element={<IndividualCountry />} />
        <Route path="/site" element={<Site />} />
        <Route path="/country/rankings" element={<CountriesRanked />} />
        <Route path="/site/:site" element={<Website />} />
      </Routes>
    </BrowserRouter>
  );
}