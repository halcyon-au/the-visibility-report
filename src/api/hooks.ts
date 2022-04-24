import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CountryScore, CountryScoreWBlocked, GetBlockedResponse } from "../useApiClient/ApiClient.generated";
import useApiClient from "../useApiClient/useApiClient";
import { OONI_URI } from "./ooni";

const API_URI = import.meta.env.MODE === "development" ? (() => {
  return window.location.origin.startsWith("http://localhost") ? "http://localhost:1323/api/" : "https://api.visibilityreport.techytechster.com/api/";
})() : "https://api.visibilityreport.techytechster.com/api/";

export const useRankings = () => {
  const apiClient = useApiClient();
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState<CountryScore[]>();
  // const [error, setError] = useState("");
  // const fetchData = async () => {
  //   try {
  //     const request = (await apiClient.rankingsAll()).result;
  //     setData(request as CountryScore[]);
  //   } catch (error) {
  //     setError(JSON.stringify((error as AxiosError).response?.data));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // return { data, loading, error };
  return useQuery(["rankings"], async () => (await apiClient.rankingsAll()).result);
};

export const useBlocked = (countryName: string, websiteName: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetBlockedResponse>();
  const [error, setError] = useState("");
  const apiClient = useApiClient();

  const fetchData = async (countryName: string, websiteName: string) => {
    try {
      const request = (await apiClient.blocked(countryName, websiteName)).result;
      setData(request);
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
};

export const useWhoBlockedMe = (websiteName: string) => {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [unblocked, setUnblocked] = useState<string[]>([]);
  const [possible, setPossible] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);
  const [error, setError] = useState("");
  const apiClient = useApiClient();

  const fetchData = async (websiteName: string) => {
    const country_uri = `${OONI_URI}api/_/countries`;
    const countries = (await axios.get(country_uri)).data.countries as OONICountry[];
    const promises = [];
    try {
      for (const country of countries) {
        const request = apiClient.status(country.name, websiteName);
        promises.push(request);
      }
      await Promise.all(promises);
      const b = [], u = [], p = [], uk = [];
      for (let i = 0; i < countries.length; i += 1) {
        const country = countries[i];
        const data = (await promises[i]).result; // should be instant since we already did http request.
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
};

export function useRanking(countryName: string) {
  const apiClient = useApiClient();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CountryScoreWBlocked>();
  const [blockedMap, setBlockedMap] = useState<Map<string, WebsiteStatus>>();
  const [error, setError] = useState("");

  const fetchData = async (countryName: string) => {
    try {
      const resp = (await apiClient.rankings(countryName)).result;
      const blockedMap = new Map<string, WebsiteStatus>();
      for (const web of resp.websites ?? []) {
        let blocked: WebsiteStatus = { Blocked: false };
        for (const bWeb of resp.blockedWebsites ?? []) {
          if (bWeb.toUpperCase() === web.toUpperCase()) {
            blocked = { Blocked: true };
            break;
          }
        }
        for (const pWeb of resp.possibleWebsites ?? []) {
          if (pWeb.toUpperCase() === web.toUpperCase()) {
            blocked.Possible = true;
            break;
          }
        }
        if (!blockedMap.get(web.toUpperCase())) {
          blockedMap.set(web.toUpperCase(), blocked);
        }
      }
      setBlockedMap(blockedMap);
      setData(resp);
    } catch (error) {
      console.log(error);
      setError(JSON.stringify((error as AxiosError).response?.data));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(countryName);
  }, []);
  return { loading, data, blockedMap, error };
}
