/* eslint-disable indent */
import axios from "axios";
import { useQuery } from "react-query";
import { CountryScoreWBlocked } from "../useApiClient/ApiClient.generated";
import useApiClient from "../useApiClient/useApiClient";
import { OONI_URI } from "./ooni";

export const useRankings = () => {
  const apiClient = useApiClient();
  return useQuery(["rankings"], async () => (await apiClient.rankingsAll()).result);
};

export const useBlocked = (countryName: string, websiteName: string) => {
  const apiClient = useApiClient();
  return useQuery(["blocked", countryName, websiteName], async () => (await apiClient.blocked(countryName, websiteName)).result);
};

export const useWhoBlockedMe = (websiteName: string) => {
  const apiClient = useApiClient();
  return useQuery(["whoblockedme", websiteName], async () => {
    const country_uri = `${OONI_URI}api/_/countries`;
    const countries = (await axios.get(country_uri)).data.countries as OONICountry[];
    const promises = [];
    for (const country of countries) {
      const request = apiClient.status(country.name, websiteName);
      promises.push(request);
    }
    try {
      await Promise.all(promises);
    } catch (err) {
      console.error(err);
    }
    const b = [], u = [], p = [], uk = [];
    for (let i = 0; i < countries.length; i += 1) {
      const country = countries[i];
      try {
        const data = (await promises[i]).result;
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
      } catch (err) {
        uk.push(country.name);
      }
    }
    return { blocked: b, unblocked: u, unknown: uk, possible: p };
  });
};

export function useRanking(countryName: string) {
  const apiClient = useApiClient();
  return useQuery(["ranking", countryName], async () => {
    const resp = (await apiClient.rankings(countryName)).result;
    return { countryRankings: resp };
  });
}

export function useBlockedMapping(cScore: CountryScoreWBlocked): Map<string, WebsiteStatus> {
  const blockedMap = new Map<string, WebsiteStatus>();
  for (const web of cScore.websites ?? []) {
    let blocked: WebsiteStatus = { Blocked: false };
    for (const bWeb of cScore.blockedWebsites ?? []) {
      if (bWeb.toUpperCase() === web.toUpperCase()) {
        blocked = { Blocked: true };
        break;
      }
    }
    for (const pWeb of cScore.possibleWebsites ?? []) {
      if (pWeb.toUpperCase() === web.toUpperCase()) {
        blocked.Possible = true;
        break;
      }
    }
    if (!blockedMap.get(web.toUpperCase())) {
      blockedMap.set(web.toUpperCase(), blocked);
    }
  }
  return blockedMap;
}