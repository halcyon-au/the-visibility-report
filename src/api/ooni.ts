import { useEffect, useState } from "react";

export const OONI_URI = "https://api.ooni.io/";
export function useCountries() {
  const [countryData, setCountryData] = useState<{ loading: boolean, countries: OONICountry[] }>({ loading: true, countries: [] });
  useEffect(() => {
    fetchCountries().then((resp) => {
      setCountryData({ loading: false, countries: resp });
    }).catch((err) => {
      console.error(err);
      setCountryData({ loading: false, countries: [] });
    });
  }, []);
  async function fetchCountries(): Promise<OONICountry[]> {
    const country_uri = `${OONI_URI}api/_/countries`;
    const countries = await fetch(country_uri);
    if (countries.status != 200) {
      throw Error(`Failed To Get Countries: ${await countries.text()}`);
    }
    return (await countries.json()).countries;
  }
  return countryData;
}