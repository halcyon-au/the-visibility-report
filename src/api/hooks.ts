import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";
import { OONI_URI } from "./ooni";

const API_URI = import.meta.env.MODE === "development" ? (() => {
  return window.location.origin.startsWith("http://localhost") ? "http://localhost:1323/api/"
    : (() => { throw Error("replace this when dev api exists"); })();
})() : (() => {
  throw Error("replace this when production api exists");
  return "NOT DONE";
})();
export function useRankings() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CountryRanking[]>();
  const [error, setError] = useState("");
  const fetchData = async () => {
    // exponential backoff with jitter
    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => {
        return Math.random() * (Math.min(10000, 1000 * (retryCount ** 2))); // https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
      }
    });
    const uri = new URL("v1/countries/rankings", API_URI);
    try {
      const request = await axios.get(uri.href);
      setData(request.data as CountryRanking[]);
    } catch (error) {
      setError(JSON.stringify((error as AxiosError).response?.data));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error };
}
export function useBlocked(countryName: string, websiteName: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BlockedResponse>();
  const [error, setError] = useState("");
  const fetchData = async (countryName: string, websiteName: string) => {
    const uri = new URL(`v1/blocked/${countryName}/${websiteName}`, API_URI);
    try {
      const request = await axios.get(uri.href);
      const resp = request.data;
      setData(resp);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(countryName, websiteName);
  }, []);
  return { loading, data, error };
}
export function useWhoBlockedMe(websiteName: string) {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [unblocked, setUnblocked] = useState<string[]>([]);
  const [possible, setPossible] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);
  const [error, setError] = useState("");
  const fetchData = async (websiteName: string) => {
    const country_uri = `${OONI_URI}api/_/countries`;
    const countries = (await axios.get(country_uri)).data.countries as OONICountry[];
    const promises = [];
    try {
      for (const country of countries) {
        const uri = new URL(`v1/status/${country.name}/${websiteName}`, API_URI);
        const request = axios.get<BlockedResponse>(uri.href);
        promises.push(request);
      }
      await Promise.all(promises);
      const b = [], u = [], p = [], uk = [];
      for (let i = 0; i < countries.length; i += 1) {
        const country = countries[i];
        const data = (await promises[i]).data; // should be instant since we already did http request.
        switch (data.status) {
        case "Blocked":
          b.push(country.name);
          break;
        case "Unblocked":
          u.push(country.name);
          break;
        case "Unknown":
          uk.push(country.name);
          break;
        case "Possible":
          p.push(country.name);
        }
      }
      setBlocked(b);
      setUnblocked(u);
      setPossible(p);
      setUnknown(uk);
      console.log(b);
      console.log(u);
      console.log(p);
      console.log(uk);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(websiteName);
  }, []);
  return { loading, unblocked, blocked, possible, unknown, error };
}
export function useRanking(countryName: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CountryRankingWBlocks>();
  const [error, setError] = useState("");
  const fetchData = async (countryName: string) => {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => {
        return Math.random() * (Math.min(10000, 1000 * (retryCount ** 2))); // https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
      }
    });
    const uri = new URL(`v1/countries/rankings/${countryName}`, API_URI);
    try {
      const request = await axios.get(uri.href);
      const resp = request.data as CountryRankingWBlocks;
      const blockedMap = new Map<string, WebsiteStatus>();
      for (const web of resp.Websites) {
        let blocked: WebsiteStatus = { Blocked: false };
        for (const bWeb of resp.BlockedWebsites) {
          if (bWeb.toUpperCase() === web.toUpperCase()) {
            blocked = { Blocked: true };
            break;
          }
        }
        for (const pWeb of resp.PossibleWebsites) {
          if (pWeb.toUpperCase() === web.toUpperCase()) {
            blocked.Possible = true;
            break;
          }
        }
        if (!blockedMap.get(web.toUpperCase())) {
          // console.log(web.toUpperCase());
          blockedMap.set(web.toUpperCase(), blocked);
        }
      }
      resp.BlockedMapping = blockedMap;
      setData(request.data as CountryRankingWBlocks);
    } catch (error) {
      setError(JSON.stringify((error as AxiosError).response?.data));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(countryName);
  }, []);
  return { loading, data, error };
}